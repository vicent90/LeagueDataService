/* eslint-disable no-console */
import mongoose from 'mongoose';
import env from '../environment';

const connectDB = async () => {
  try {
    const uri = `mongodb://${env.mongoUsername}:${env.mongoPassword}@localhost:${env.mongoPort}/`;
    await mongoose.connect(uri, { dbName: env.mongoCollectionName });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
