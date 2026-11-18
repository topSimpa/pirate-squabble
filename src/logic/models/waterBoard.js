//waterBoard.js
//Grid board where player places ships and attack opponents.

import { SHIP_ORIENTATION } from "../constant.js";

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ship = null;
    this.active = true;
  }
}

export default class WaterBoard {
  #rows = 10;
  #cols = 10;
  #boardShips = [];

  #buildBoard() {
    let rowIndex = 0;
    const arr = [];

    while (rowIndex < this.#rows) {
      const row = [];
      let colIndex = 0;
      while (colIndex < this.#cols) {
        row.push(new Cell(rowIndex, colIndex));
        colIndex++;
      }
      arr.push(row);
      rowIndex++;
    }
    return arr;
  }

  constructor() {
    this.board = this.#buildBoard();
  }

  isAllSunk() {
    for (let ship of this.#boardShips) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }

  placeShip(ship, start, orient = SHIP_ORIENTATION.hor) {
    const placeHor = (ship, start) => {
      const rowIndex = start[0];
      const stop = ship.length + start[1];
      let colIndex = start[1];

      while (colIndex < stop) {
        this.board[rowIndex][colIndex].ship = ship;
        colIndex++;
      }
    };

    const placeVert = (ship, start) => {
      const colIndex = start[1];
      const stop = ship.length + start[1];
      let rowIndex = start[0];

      while (rowIndex < stop) {
        this.board[rowIndex][colIndex].ship = ship;
        rowIndex++;
      }
    };

    switch (orient) {
      case SHIP_ORIENTATION.hor:
        placeHor(ship, start);
        break;
      case SHIP_ORIENTATION.vert:
        placeVert(ship, start);
    }

    this.#boardShips.push(ship);
  }

  receiveAttack(x, y) {
    const cell = this.board[x][y];
    if (cell.active && cell.ship) {
      const ship = cell.ship;
      ship.hit();
      cell.active = false;
      return true;
    }

    cell.active = false;
    return false;
  }
}
