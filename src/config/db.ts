import console from 'console';
import mongoose from 'mongoose';
import process from 'process';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, { dbName: 'course_db' });
    console.log('successfully connected to database');
  } catch (error) {
    console.log('failed to connect to database', error);
  }
};
