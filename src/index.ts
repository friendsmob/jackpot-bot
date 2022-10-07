import { connect } from "mongoose";
import { Telegraf, Markup } from "telegraf";

import { renderBoard } from "./ui";
import { getRandomArbitrary } from "./utils";

import { Game } from "./models";
import { MESSAGES, COMMANDS } from "./consts";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

async function main() {
  await connect(process.env.DB_URI as string);

  bot.start((ctx) => ctx.reply("👍"));
  bot.help((ctx) => ctx.reply("jackpot? jackpot!"));

  bot.command(COMMANDS.STATS, (ctx) => ctx.reply("TODO: stats"));
  bot.command(COMMANDS.DUEL, (ctx) => ctx.reply("TODO: duel"));
  bot.command(COMMANDS.GAME, async (ctx) => {
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
      ...Markup.inlineKeyboard(
        renderBoard(instance.id, instance.cell as number)
      ),
      parse_mode: "HTML",
    });
  });

  bot.launch();
}

main();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
