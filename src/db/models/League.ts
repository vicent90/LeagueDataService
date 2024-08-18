import mongoose, { Schema, Document } from 'mongoose';

export interface ILeague extends Document {
  name: string;
  code: string;
  areaName: string;
}

const LeagueSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  areaName: { type: String, required: true },
});

export const League = mongoose.model<ILeague>('League', LeagueSchema);
