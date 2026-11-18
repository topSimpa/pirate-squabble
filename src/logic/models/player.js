//player.js

import WaterBoard from "./waterBoard.js";

export default class Player {
  constructor(type, waterBoard, id) {
    this.id = id;
    this.type = type;
    this.waterBoard = waterBoard;
  }
}

//per the Design the player is coupled to it board
//this make sense if you think of the game
