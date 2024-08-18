import mongoose, { Schema, Document } from 'mongoose';

export interface ICoach extends Document {
  name: string;
  dateOfBirth: string;
  nationality: string;
}

const CoachSchema: Schema = new Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
});

export const Coach = mongoose.model<ICoach>('Coach', CoachSchema);
