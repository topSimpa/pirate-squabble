//waterBoard.js

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

  placeShip(ship, start) {
    let colIndex = start[1];
    const rowIndex = start[0];

    while (colIndex < ship.length + start[1]) {
      this.board[rowIndex][colIndex].ship = ship;
      colIndex++;
    }
    this.#boardShips.push(ship);
  }

  receiveAttack(x, y) {
    const cell = this.board[x][y];
    if (cell.active && cell.ship) {
      const ship = cell.ship;
      ship.hit();
    }

    cell.active = false;
  }
}
