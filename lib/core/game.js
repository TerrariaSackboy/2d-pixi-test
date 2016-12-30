"use strict";

var Game = function () {
	this.isInitialized = false; //Boolean to see whether the game is initialized
	this.stage = null;
	this.renderer = null;
	this.load();
};

Game.prototype = {
	initialize: function () {
		if (this.isInitialized)
			return; //It's already initialized
		
		this.stage = new PIXI.Container(); //Make the stage
		this.renderer = PIXI.autoDetectRenderer(256, 256); //TODO move the hardcoded values to a different place
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
