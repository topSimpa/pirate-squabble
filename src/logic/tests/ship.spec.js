//ship.spec.js
//test for ships public interfaces

import Ship from "../models/ship.js";

describe("testing if ship hit, result in the rigth sideEffect", () => {
  const ship = new Ship(5);

  test("testing before any hit", () => {
    expect(ship.hitCount).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test("testing after one hit", () => {
    ship.hit(); //action
    expect(ship.hitCount).toBe(1);
    expect(ship.isSunk()).toBe(false);
  });

  //note at this point ship has been hit 1 time already
  test("testing after multiple hit", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.hitCount).toBe(5);
    expect(ship.isSunk()).toBe(true);
  });
});
