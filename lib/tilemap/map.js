"use strict";

var Tile = require ("./tile.js");

var Map = function (game) {
	PIXI.SpriteBatch.call(this); //Because there will be many, many sprites/tiles being rendered
	this.game = game;
	//this.entities = null; TODO ECS
	this.settings = {};
	this.tiles = [];
	this.pixitiles = []
	
	this.initialize(); //Initialize
};

//Inherit SpriteBatch's prototype. Unfortunately this means the prototype = {}; syntax can't be used.
Map.prototype = Object.create(PIXI.SpriteBatch.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function () {
	this.settings = {
		tilesX: 60,
		tilesY: 40,
		tileSize: 16
	};
	
	for (var x = 0; x < this.settings.tilesX; x++) {
		for (var y = 0; y < this.settings.tilesY; y++) {
			this.tiles[x + y*this.settings.tilesX] = new Tile(Tile.tileNumber["rock"], true, null);
			this.pixitiles[x + y*this.settings.tilesX] = PIXI.Sprite.fromFrame("t_rock.png");
			
			this.pixitiles[x + y*this.settings.tilesX].position.x = x * this.settings.tileSize;
			this.pixitiles[x + y*this.settings.tilesX].position.y = y * this.settings.tileSize;
			
			this.addChild(this.pixitiles[x + y*this.settings.tilesX]);
		}
	}
};

Map.prototype.getTile = function (position) {
	var tile = this.tiles[position.x + position.y*this.settings.tilesX];
	
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
