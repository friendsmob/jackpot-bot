import { ObjectId } from "mongoose";
import { Markup } from "telegraf";

import { EMOJI } from "./consts";

function renderBoard(gameId: ObjectId, cell: number = -1) {
  const board = [];
  let count = 0;

  for (let i = 0; i < 3; i++) {
    const row = [];

    for (let j = 0; j < 3; j++) {
      const symbol = count === cell ? EMOJI.WIN : EMOJI.LOOSE;
      row.push(Markup.button.callback(symbol, `btn-${gameId}-${count}`));
      count++;
    }

    board.push(row);
  }

  return board;
}

export { renderBoard };
