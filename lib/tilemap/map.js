"use strict";

var Tile = require ("./tile.js");

var Map = function (game) {
	PIXI.Container.call(this); //Inherit the constructor
	this.game = game;
	//this.entities = null; TODO ECS
	this.settings = game.settings;
	this.tiles = [];
	this.pixitiles = []; //Since we can't call a class, we must use another container.
	
	this.initialize(); //Initialize
};

//Inherit SpriteBatch's prototype. Unfortunately this means the prototype = {}; syntax can't be used.
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function () {
	for (var x = 0; x < this.settings.tilesX; x++) {
		this.tiles[x] = []; //Initialize the row
		for (var y = 0; y < this.settings.tilesY; y++) {
			this.tiles[x][y] = new Tile(Tile.tileNumber["rock"], true, null); //Make it solid rock
		}
	}
};

Map.prototype.getTile = function (position) {
	var tile = this.tiles[position.x][position.y];
	
	if (tile)
		return tile;
}

Map.prototype.insideBounds = function (position) {
	return (
		position.x > 0 &&
		position.x < this.settings.tilesX &&
		position.y > 0 &&
		position.y < this.settings.tilesY
	);
}

module.exports = Map;
