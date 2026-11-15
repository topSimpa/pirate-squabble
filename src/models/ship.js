//ship.js

export default class Ship {
  #hits = 0;
  #length;

  constructor(length) {
    this.#length = length;
  }

  get hitCount() {
    return this.#hits;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits >= this.#length;
  }
}
