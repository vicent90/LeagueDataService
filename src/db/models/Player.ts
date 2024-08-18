import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from './Team';

export interface IPlayer extends Document {
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  team: ITeam['_id'];
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
});

export const Player = mongoose.model<IPlayer>('Player', PlayerSchema);
