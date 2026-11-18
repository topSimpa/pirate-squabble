//gameController.js
import { GAME_STATE } from "../constant.js";

//it needs player 1 and player2 and ships and board
//it needs to notify start of game
//it needs to tell whose turn it is switch turn
//it tells if an attack is a hit or a miss
//

//todo: getActivePlayer,
//todo: getStatus
//todo: playRound,
//todo: getBoard,

export default class Game {
  #player1 = null;
  #player2 = null;
  #activeplayer = null;
  #isAWin = false;
  #isHit = false;
  #inPlay = false;

  #pick() {
    return Math.floor(Math.random() * 3);
  }

  #switchTurn() {
    this.#activeplayer =
      this.#activeplayer === this.#player1 ? this.#player2 : this.#player1;
  }

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#activeplayer = this.#pick() === 1 ? this.#player1 : this.#player2;
    this.#inPlay = true;
  }

  get status() {
    if (this.#isAWin) return GAME_STATE.win;
    if (this.#inPlay && this.#isHit) return GAME_STATE.hit;
    if (this.#inPlay && !this.#isHit) return GAME_STATE.turn;
  }

  getActivePlayer() {
    return this.#activeplayer;
  }

  // getAllBoards() {
  //   return {
  //     [this.#player1.id]: this.#player1.waterBoard.board,
  //     [this.#player2.id]: this.#player2.waterBoard.board,
  //   };
  // }

  playTurn(x, y) {
    const opponent =
      this.#activeplayer === this.#player1 ? this.#player2 : this.#player1;

    if (opponent.waterBoard.receiveAttack(x, y)) {
      this.#isHit = true;
      this.#isAWin = opponent.waterBoard.isAllSunk();
    } else {
      this.#switchTurn();
      this.#isHit = false;
    }
  }
}
