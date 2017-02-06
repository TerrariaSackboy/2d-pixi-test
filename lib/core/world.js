"use strict";

var	Camera = require ("./camera.js"),
	Vector2d = require('../geometry/vector2d.js');

var World = function (game) {
	PIXI.Container.call(this); //Inherit the constructor
	this.game = game;
	this.camera = null;
	this.initialize();
};

//Become a PIXI.Container
World.prototype = Object.create(PIXI.Container.prototype);
World.prototype.constructor = World;

World.prototype.initialize = function () {
	this.camera = new Camera(this.game, new Vector2d(0, 0)); //Make the camera
	this.scale = new PIXI.Point(this.game.settings.zoom, this.game.settings.zoom); //Scale the world
	this.game.stage.addChild(this); //Add the PIXI.Container to the stage
}

World.prototype.update = function() {
	this.camera.update();
	this.position = new PIXI.Point(-this.camera.position.x, -this.camera.position.y); //Scroll the map with the camera's position
};

module.exports = World;
