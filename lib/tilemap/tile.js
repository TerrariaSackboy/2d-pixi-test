"use strict";

var Tile = function(position, type, blockLight, room) {
	this.position = position; //Holds position data
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

Tile.tileNumber = {};
Tile.tileName = [];
Tile.addTileType = function (name, number) {
	Tile.tileNumber[name] = number;
	Tile.tileName[number] = name;
}

Tile.addTileType("air",	0);
Tile.addTileType("rock", 2);

module.exports = Tile;
