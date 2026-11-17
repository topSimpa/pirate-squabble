//waterBoard.spec.js
//test on the board that the game is played on

import WaterBoard from "../models/waterBoard.js";

const makeMockShip = (length, sunk = false) => {
  return {
    length,
    hit: jest.fn(),
    isSunk: jest.fn(() => sunk),
  };
};

describe("board can handle recieve attack", () => {
  const board = new WaterBoard();
  const mockShip = makeMockShip(3);

  board.placeShip(mockShip, [1, 0]);

  test("receiving first attacks", () => {
    board.receiveAttack(1, 0);
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

  test("attack is a miss, does board record it", () => {
    board.receiveAttack(1, 3);
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
