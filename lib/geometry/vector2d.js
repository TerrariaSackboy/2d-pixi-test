"use strict";

var Vector2d = function (x, y) {
	this.x = x;
	this.y = y
};

Vector2d.prototype = {
	combine: function (other) {
		return new Vector2d (this.x+other.x, this.y+other.y);
	},
	distance: function (pos) {
		let dx = pos.x - this.x;
		let dy = pos.x - this.x;
		
		return Math.abs(Math.sqrt((dx * dx) + (dy * dy)));
	},
	manhattan: function (pos) {
		return(Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y));
	},
	clone: function () {
		return(
			new Vector2d(this.x, this.x)
		);
	},
	toString: function () {
		return("(" + this.x + ", " + this.y + ")");
	}
};

module.exports = Vector2d;
