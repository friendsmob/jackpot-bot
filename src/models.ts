import { Schema, model } from "mongoose";

const GameSchema = new Schema({
  host: Number,
  cell: Number,
  active: Boolean,
});

const Game = model("Game", GameSchema);

export { Game };
