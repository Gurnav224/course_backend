import mongoose from 'mongoose';
import process from 'process';
import console from 'console';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('successfully connected to database');
  } catch (error) {
    console.log('failed to connect to database', error);
  }
};
