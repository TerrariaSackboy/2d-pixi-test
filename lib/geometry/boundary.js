"use strict";

var Boundary = function (left, top, width, height) {
	this.left = left || 0;
	this.top = top || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.right = left + width;
	this.bottom = top + height;
};

Boundary.prototype = {
	set: function (left, top, width, height) {
		this.left = left || 0;
		this.top = top || 0;
		this.width = width || 0;
		this.height = height || 0;
		this.right = left + width;
		this.bottom = top + height;
	},
	isWithin: function(boundary) { //Returns whether this boundary is inside another
		return(
			boundary.left <= this.left &&
			boundary.right >= this.right &&
			boundary.top <= this.top &&
			boundary.bottom >= this.bottom
		);
	},
	isOverlapping: function(boundary) { //Returns whether this boundary is intersecting/overlapping another
		return(
			this.left < boundary.right &&
			boundary.left < this.right &&
			this.top < boundary.bottom &&
			boundary.top < this.bottom
		);
	}
};

module.exports = Boundary;
