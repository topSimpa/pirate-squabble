//player.spec.js
//test for the player model

import Player from "../models/player";

describe("test for player's property", () => {
  const player = new Player();

  test("test if player has a type property", () => {
    expect(player).toHaveProperty("type");
  });

  test("test if player has a board property", () => {
    expect(player).toHaveProperty("board");
  });
});
