import { Markup } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";

import { COMMANDS, EMOJI } from "./consts";

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function listCommands(): string {
  return Object.values(COMMANDS)
    .map((command) => `<b>/${command}</b>`)
    .join("</br>");
}

function parseContext(ctx: any): {
  messageId: number;
  userId: number;
  chatId: number;
  pick?: number;
} {
  const message = ctx.message as Message.TextMessage;

  const userId = ctx.from?.id as number;
  const messageId = message.message_id;
  const chatId = message.chat.id;

  const pick = ctx.match?.[1];

  return {
    userId,
    messageId,
    chatId,
    pick,
  };
}

function renderBoard(cell: number = -1) {
  const board = [];
  let count = 0;

  for (let i = 0; i < 3; i++) {
    const row = [];

    for (let j = 0; j < 3; j++) {
      const symbol = count === cell ? EMOJI.WIN : EMOJI.LOOSE;
      row.push(Markup.button.callback(symbol, `btn-${count}`));
      count++;
    }

    board.push(row);
  }

  return board;
}

export { getRandomArbitrary, listCommands, parseContext, renderBoard };
