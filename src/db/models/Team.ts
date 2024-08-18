import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  players: mongoose.Types.ObjectId[];
  coach: mongoose.Types.ObjectId | null;
  leagues: mongoose.Types.ObjectId[];
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  tla: { type: String, required: true },
  shortName: { type: String, required: true },
  areaName: { type: String, required: true },
  address: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  coach: { type: Schema.Types.ObjectId, ref: 'Coach', default: null },
  leagues: [{ type: Schema.Types.ObjectId, ref: 'League', required: true }],
});

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
