"use strict";

//Require necessary module
var Boundary = require("../geometry/boundary.js");

var Camera = function (game, position) {
	this.game = game;
	this.position = position;
	this.viewportWidth = game.sizeManager.width;
	this.viewportHeight = game.sizeManager.height;
	this.followObject = null;
	
	this.minimumDistanceX = 0;
	this.minimumDistanceY = 0;
	
	this.viewportBoundary = new Boundary(
		this.position.x * this.game.settings.tileSize * this.game.settings.zoom,
		this.position.y * this.game.settings.tileSize * this.game.settings.zoom,
		this.viewportWidth,
		this.viewportHeight
	);
	this.mapBoundary = new Boundary(
		0,
		0,
		game.settings.tilesX * game.settings.tileSize * this.game.settings.zoom,
		game.settings.tilesY * game.settings.tileSize * this.game.settings.zoom
	);
};

Camera.prototype = {
	//TODO following entities: requires Entity Component System
	update: function () {
		if (this.followObject !== null) {
			//TODO following entities
		}
	}
};

module.exports = Camera;
