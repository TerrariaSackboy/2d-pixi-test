"use strict";

//Require necessary modules
var	SizeManager =	require("./sizeManager.js"),
	World =	require("./world.js"),
	Camera = 	require("./camera.js"),
	Map =	require("../tilemap/map.js"),
	Vector2d =	require("../geometry/vector2d.js");

var Game = function () {
	this.isInitialized = false; //Boolean to see whether the game is initialized
	this.isActive = false;
	this.map = null;
	this.world = null;
	this.stage = null;
	this.renderer = null;
	this.sizeManager = null;
	this.settings = {
		tileSize: 16,
		tilesX: 60, //The number of horizontal tiles on this map
		tilesY: 40, //The number of vertical tiles on this map
		zoom: 2 //The scale of the map
	};
	this.load();
};

Game.prototype = {
	initialize: function () {
		if (this.isInitialized)
			return; //It's already initialized
		
		this.sizeManager = new SizeManager(this);
		this.stage = new PIXI.Container(); //Make the stage
		this.renderer = PIXI.autoDetectRenderer(this.sizeManager.width, this.sizeManager.height); //TODO move the hardcoded values to a different place
		document.body.appendChild(this.renderer.view); //Show the renderer
		this.world = new World(this); //Make the world
		this.renderer.render(this.stage);
		this.map = new Map(this);
		this.world.addChild(this.map);
		
		this.isInitialized = true; //The game is fully initialized!
		this.isActive = true; //The game is now marked active
		this.update(); //Update the game for the first time
	},
	load: function () {
		//Tell PIXI to use Nearest Neighbor to preserve pixel art
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
		
		var game = this; //Temporary reference
		
		//Load assets
		PIXI.loader
			.add([
				"assets/packed.json"
			])
			.load(this.initialize.bind(game));
	},
	update: function () {
		if (this.isInitialized && !this.isActive) //If it is not active, restart
			this.restart();
		
		requestAnimationFrame(this.update.bind(this)); //Request animation frame to call the update function
		this.world.update();
		this.renderer.render(this.stage);
	},
	restart: function () {
		this.stage.removeChildren(); //Remove the map container from the stage
		this.world = new World(this); //Create the new World object
		this.isActive = true;
	}
};

module.exports = Game;
