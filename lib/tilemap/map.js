"use strict";

var Tile = require ("./tile.js");

var Map = function (game) {
	PIXI.Container.call(this); //Inherit the constructor
	this.game = game;
	//this.entities = null; TODO ECS
	this.settings = game.settings;
	this.tiles = [];
	this.pixitiles = []; //Since we can't call a class, we must use another container.
	this.tiles = new PIXI.Container(); //We can avoid removing all the entities with the sprites
	this.addChild(this.tiles);
	
	this.initialize(); //Initialize
};

//Inherit SpriteBatch's prototype. Unfortunately this means the prototype = {}; syntax can't be used.
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.constructor = Map;

Map.prototype.initialize = function () {
	for (var x = 0; x < this.settings.tilesX; x++) {
		this.tiles[x] = []; //Initialize the row
		for (var y = 0; y < this.settings.tilesY; y++) {
			this.tiles[x][y] = new Tile(Tile.tileNumber["rock"], true, null); //Make it solid rock
		}
	}
};

Map.prototype.getTile = function (position) {
	var tile = this.tiles[position.x][position.y];
	
	if (tile)
		return tile;
}

Map.prototype.insideBounds = function (position) {
	return (
		position.x > 0 &&
		position.x < this.settings.tilesX &&
		position.y > 0 &&
		position.y < this.settings.tilesY
	);
}


Map.prototype.updateAllSprites = function () { //Update all sprites via first removing them all
	this.tiles.removeChildren(); //Remove the old sprites
	var i, n, s, w, e, nw, ne, sw, se, nwi, nei, swi, swi; //Make the sprite lists
	var flag = 0; //Bit mask flag thingy
	
	var bits = {
		"w": 0x1,
		"e": 0x2,
		"n": 0x4,
		"s": 0x8,
		
		"nw": 0x10,
		"ne": 0x20,
		"sw": 0x40,
		"se": 0x80
	};
	
	for (var x = 0; x < this.settings.tilesX; x++) { for (var y = 0; x < this.settings.tilesY; y++) { //Loop through every tile
		if (this.tiles[x][y].type == Tile.tileNumber["air"])
			continue; //No need to check empty tiles
		
		flag = 0; //First update the flag mask for which tiles exist on the sides
		if (x==0 || (this.tiles[x-1].type == this.tiles[x][y].type)) //West
			flag |= bits.w;
		if (x==(this.settings.tilesX-1) || (this.tiles[x+1].type == this.tiles[x][y].type)) //East
			flag |= bits.e;
		if (y==0 || (this.tiles[y-1].type == this.tiles[x][y].type)) //North
			flag |= bits.n;
		if (y==(this.settings.tilesY-1) || (this.tiles[y+1].type == this.tiles[x][y].type)) //South
			flag |= bits.s;
		
		//If it has both, add it, otherwise leav it be
		flag |= ()?bits.nw:0;
		
		//Now use the flag to add the tile to the correct list
		switch (flag & 0xf) { //Only the last four bits--this is important for the inside corners
			case 0: //No operating... there should be more than one neighbors
			case bits.w:
			case bits.e:
			case bits.n:
			case bits.s: 
			case bits.w+bits.e: //And not a strand
			case bits.s+bits.n:break;
			
			//Corners
			case bits.n+bits.w:	nw[nw.length]=this.tiles[x][y];	break;
			case bits.n+bits.e:	ne[ne.length]=this.tiles[x][y];	break;
			case bits.s+bits.w:	sw[sw.length]=this.tiles[x][y];	break;
			case bits.s+bits.e:	se[se.length]=this.tiles[x][y];	break;
			//Edges	-	-
			case bits.n+bits.w+bits.e:	s[s.length]=this.tiles[x][y];	break;
			case bits.s+bits.w+bits.e:	n[n.length]=this.tiles[x][y];	break;
			case bits.s+bits.n+bits.w:	e[e.length]=this.tiles[x][y];	break;
			case bits.s+bits.n+bits.e:	w[w.length]=this.tiles[x][y];	break;
			//Center tile and inside corners
			case bits.s+bits.n+bits.w+bits.e:	i[i.length]=this.tiles[x][y];	break;
		}
	}}
}

module.exports = Map;
