"use strict";

//Require necessary modules
var SizeManager = require("./sizeManager.js");

var Game = function () {
	this.isInitialized = false; //Boolean to see whether the game is initialized
	this.stage = null;
	this.renderer = null;
	this.sizeManager = null;
	this.settings = {
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
		this.renderer.render(this.stage);
		
		this.isInitialized = true; //The game is fully initialized!
	},
	load: function () {
		//Tell PIXI to use Nearest Neighbor to preserve pixel art
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
		
		//Load assets
		PIXI.loader
			.add([
				"assets/packed.json"
			])
			.load(this.initialize);
	}
};

module.exports = Game;
