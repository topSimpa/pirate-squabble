//player.js

import WaterBoard from "./waterBoard.js";

export default class Player {
  constructor(type) {
    this.type = type;
    this.board = new WaterBoard();
  }
}

//per the Design the player is coupled to it board
//this make sense if you think of the game
