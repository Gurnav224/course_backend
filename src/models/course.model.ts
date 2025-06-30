import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['online', 'offline'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
