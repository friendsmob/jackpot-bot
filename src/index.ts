import { ObjectId, connect } from "mongoose";
import { Telegraf, Markup } from "telegraf";

import { Game } from "./models";

const EMOJI = {
  WIN: "🍆",
  LOOSE: "🤡",
  HIDDEN: "🎰",
};

const MESSAGES = {
  INIT: "Угадайте, в каком аппарате <b>джекпот</b>!",
  WIN: "<b>Джекпот! Джекпот!</b>",
  LOOSE: "<b>Хуй те в рот!</b>",
};

// DB
connect(process.env.DB_URI as string);

// Utils
function renderBoard(gameId: ObjectId) {
  const board = [];
  let count = 0;

  for (let i = 0; i < 3; i++) {
    const row = [];

    for (let j = 0; j < 3; j++) {
      row.push(Markup.button.callback(EMOJI.HIDDEN, `btn-${gameId}-${count}`));
      count++;
    }

    board.push(row);
  }

  // board.push([Markup.button.callback("Окончить игру", `btn-${gameId}-finish`)]);

  return board;
}

function renderRevealedBoard(gameId: ObjectId, cell: number) {
  const board = [];
  let count = 0;

  for (let i = 0; i < 3; i++) {
    const row = [];

    for (let j = 0; j < 3; j++) {
      const symbol = count === cell ? EMOJI.WIN : EMOJI.LOOSE;
      row.push(Markup.button.callback(symbol, "0"));
      count++;
    }

    board.push(row);
  }

  return board;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

// Bot
const bot = new Telegraf(process.env.BOT_TOKEN as string);
bot.start((ctx) => ctx.reply("👍"));
bot.help((ctx) => ctx.reply("jackpot? jackpot!"));

bot.command("stats", (ctx) => ctx.reply("TODO: stats"));
bot.command("duel", (ctx) => ctx.reply("TODO: duel"));
bot.command("zalupa", async (ctx) => {
  const instance = new Game({
    host: ctx.from.id,
    cell: getRandomArbitrary(0, 8),
    active: true,
  });

  let saved;

  try {
    saved = await instance.save();
  } catch (error) {
    console.log("Couldn't create the game instance: ", error);
  }

  if (!saved) {
    return;
  }

  ctx.reply(MESSAGES.INIT, {
    ...Markup.inlineKeyboard(renderBoard(saved.id)),
    parse_mode: "HTML",
  });
});

bot.action(/^btn-([0-9a-fA-F]{24})-([0-8])/i, async (ctx) => {
  let instance;

  try {
    instance = await Game.findById(ctx.match[1]).select("cell host");
  } catch (error) {
    console.log("Couldn't find game instance: ", error);
  }

  if (!instance) {
    return;
  }

  if (instance.host !== ctx.from?.id) {
    return;
  }

  const isWon = instance.cell === Number(ctx.match[2]);

  return ctx.editMessageText(isWon ? MESSAGES.WIN : MESSAGES.LOOSE, {
    ...Markup.inlineKeyboard(renderRevealedBoard(instance.id, instance.cell as number)),
    parse_mode: "HTML",
  });
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
