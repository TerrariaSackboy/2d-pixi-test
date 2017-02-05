"use strict";

var Tile = function(type, blockLight, room) {
	this.type = type;
	this.blockLight = blockLight;
	this.belongsTo = room || null;
	this.entities = [];
	this.lightLevel = 0;
	this.renderLightLevel = 0;
	this.explored = false;
};

Tile.prototype = {
	/*addEntity: function(entity) {TODO:Implement ECS
		this.entities.push(entity);
	},*/
	removeEntity: function(entity) {
		var index = this.entities.indexOf(entity);
		if(index === -1) {
			return false;
		}else{
			this.entities.splice(index, 1);
			return true;
		}
	}
};

module.exports = Tile;
