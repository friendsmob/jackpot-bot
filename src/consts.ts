const EMOJI = {
  WIN: process.env.EMOJI_WIN || "💶",
  LOOSE: process.env.EMOJI_LOOSE || "💨",
  HIDDEN: process.env.EMOJI_HIDDEN || "🎰",
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

const ACTIONS = {
  PLAY: /^play-([0-8])/i,
  FINISH: /^play-(finish)/i,
};

export { EMOJI, MESSAGES, ACTIONS, COMMANDS };
