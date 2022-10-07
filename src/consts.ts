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

const COMMANDS = {
  GAME: process.env.GAME_COMMAND || "game",
  STATS: process.env.STATS_COMMAND || "stats",
  DUEL: process.env.DUEL_COMMAND || "duel",
};

export { EMOJI, MESSAGES, COMMANDS };
