"use strict";

var SizeManager = function (game) {
	this.game = game;
	
	this.width = 0;
	this.height = 0;
	
	this.minWidth = null;
	this.maxWidth = null;
	this.minHeight = null;
	this.maxHeight = null;
	
	this.initialize();
};

SizeManager.prototype = {
	initialize: function () {
		this.setSize(); //Set width and height
		
		window.addEventListener('resize', this.windowResize.bind(this), false); //Bind event listeners
	},
	
	setSize: function () {
		var width = 0;
		var height = 0;
		var innerWidth = window.innerWidth;
		var innerHeight = window.innerHeight;
		
		//Set correct width based on min and max height
		if(this.minWidth !== null && this.minWidth >= innerWidth){
			width = this.minWidth;
		}else if(this.maxWidth !== null && this.maxWidth <= innerWidth){
			width = this.maxWidth;
		}else{
			width = innerWidth;
		}
		
		//Set correct height based on min and max height
		if(this.minheight !== null && this.minheight >= innerheight){
			height = this.minheight;
		}else if(this.maxheight !== null && this.maxheight <= innerheight){
			height = this.maxheight;
		}else{
			height = innerheight;
		}
	},
	
	windowResize: function () {
		this.setSize();
		this.game.renderer.resize(this.width, this.height);
	}
}

module.exports = SizeManager;
