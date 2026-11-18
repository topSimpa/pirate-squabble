//waterBoard.spec.js
//test on the board that the game is played on

import WaterBoard from "../models/waterBoard.js";
import { SHIP_ORIENTATION } from "../constant.js";

const makeMockShip = (length, sunk = false) => {
  return {
    length,
    hit: jest.fn(),
    isSunk: jest.fn(() => sunk),
  };
};

describe("board can have ships place in them", () => {
  const shortShip = makeMockShip(1);
  const longShip = makeMockShip(3);

  test("placing a short Ship works", () => {
    const board = new WaterBoard();
    board.placeShip(shortShip, [4, 4]);
    expect(board.board[4][4].ship).toMatchObject(shortShip);
  });

  test("placing a long ship works horizontal", () => {
    const board = new WaterBoard();
    board.placeShip(longShip, [4, 7], SHIP_ORIENTATION.hor);

    expect(board.board[4][7].ship).toMatchObject(longShip);
    expect(board.board[4][8].ship).toMatchObject(longShip);
    expect(board.board[4][9].ship).toMatchObject(longShip);
  });

  test("placing a long ship vertically", () => {
    const board = new WaterBoard();
    board.placeShip(longShip, [4, 7], SHIP_ORIENTATION.vert);

    expect(board.board[4][7].ship).toMatchObject(longShip);
    expect(board.board[5][7].ship).toMatchObject(longShip);
    expect(board.board[6][7].ship).toMatchObject(longShip);
  });
});

describe("board can handle recieve attack", () => {
  const board = new WaterBoard();
  const mockShip = makeMockShip(3);

  board.placeShip(mockShip, [1, 0]);

  test("receiving first hit attacks", () => {
    expect(board.receiveAttack(1, 0)).toBe(true);
    expect(mockShip.hit).toHaveBeenCalledTimes(1);
  });

  test("recieving consecutive attacks", () => {
    board.receiveAttack(1, 1);
    board.receiveAttack(1, 2);
    expect(mockShip.hit).toHaveBeenCalledTimes(3);
  });

  test("recieving attack in already attacked cell with ship", () => {
    board.receiveAttack(1, 2);
    expect(mockShip.hit).toHaveBeenCalledTimes(3);
  });

  test("attack is a miss", () => {
    expect(board.receiveAttack(1, 3)).toBe(false);
    expect(board.board[1][3].active).toBe(false);
  });
});

describe("board is aware of sinking ships", () => {
  const floatingShip = makeMockShip(1, false);
  const sinkedShip = makeMockShip(1, true);

  test("board with only floating ship", () => {
    const board = new WaterBoard();

    board.placeShip(floatingShip, [1, 0]);

    expect(board.isAllSunk()).toBe(false);
  });

  test("board with a mixed of floating and sunk ships", () => {
    const board = new WaterBoard();

    board.placeShip(floatingShip, [1, 0]);
    board.placeShip(sinkedShip, [3, 0]);

    expect(board.isAllSunk()).toBe(false);
  });

  test("board with only sinkedShip", () => {
    const board = new WaterBoard();

    board.placeShip(sinkedShip, [1, 0]);
  });
});
