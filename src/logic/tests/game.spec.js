//Game.spec.js
//test for the game controlling logic

//it needs player1Type player2Type
import Game from "../models/game.js";
import { GAME_STATE, PLAYER_CHOICES, PLAYER_TYPE } from "../constant.js";

//todo: getBoard: Incoming query message
//todo: getAllBoards:

const makeMockBoard = (hit, allSunk = false) => {
  return {
    receiveAttack: jest.fn(() => hit),
    isAllSunk: jest.fn(() => allSunk),
    placeShip: jest.fn(),
  };
};

const makeMockPlayer = (allSunk, id, type, hit = false) => {
  return {
    id,
    type,
    waterBoard: makeMockBoard(hit, allSunk),
  };
};

describe("test for checking if game controlling logic works well", () => {
  const playerOne = makeMockPlayer(
    false,
    PLAYER_CHOICES.one,
    PLAYER_TYPE.human,
  );

  const playerTwoActive = makeMockPlayer(
    false,
    PLAYER_CHOICES.two,
    PLAYER_TYPE.computer,
  );

  const playerTwoSunk = makeMockPlayer(
    true,
    PLAYER_CHOICES.two,
    PLAYER_TYPE.human,
    true,
  );

  test("testing game state on start", () => {
    const game = new Game(playerOne, playerTwoActive);
    expect(game.status).toBe(GAME_STATE.turn);
  });

  test("alternate active player after every turn", () => {
    const game = new Game(playerOne, playerTwoActive);
    const firstPlayer = game.getActivePlayer();
    game.playTurn(2, 1);
    const secondPlayer = game.getActivePlayer();

    expect(firstPlayer.id).not.toBe(secondPlayer.id);
  });

  test("test if playing a turn send receiveAttack on the right board", () => {
    const game = new Game(playerOne, playerTwoActive);
    game.playTurn(4, 1);
    const opponent = game.getActivePlayer();

    expect(opponent.waterBoard.receiveAttack).toHaveBeenCalledWith(4, 1);
  });

  test("test if controller notice a player win", () => {
    const game = new Game(playerOne, playerTwoSunk);
    game.playTurn(2, 1);
    game.playTurn(7, 1);

    expect(game.status).toBe(GAME_STATE.win);
  });
});
