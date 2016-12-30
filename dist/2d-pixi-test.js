(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Game = function () {
	this.isInitialized = false; //Boolean to see whether the game is initialized
	this.stage = null;
	this.renderer = null;
	this.load();
};

Game.prototype = {
	initialize: function () {
		console.log("Initializing game.");
		if (this.isInitialized)
			return; //It's already initialized
		
		this.stage = new PIXI.Container(); //Make the stage
		this.renderer = PIXI.autoDetectRenderer(256, 256); //TODO move the hardcoded values to a different place
		document.body.appendChild(this.renderer.view); //Show the renderer
		this.renderer.render(this.stage);
		
		this.isInitialized = true; //The game is fully initialized!
	},
	load: function () {
		console.log("Doing load");
		//Tell PIXI to use Nearest Neighbor to preserve pixel art
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
		
		//Load assets
		PIXI.loader.add([
			"assets/packed.json"
		])
			.load(this.initialize);
	}
};

module.exports = Game;

},{}],2:[function(require,module,exports){
"use strict";

//Require any required modules
var Game = require("./core/game.js");

//The Initialize module
var Initialize = function () {
	var game = new Game; //Create a new game
};

Initialize();

},{"./core/game.js":1}]},{},[2]);