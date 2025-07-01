import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  addCourse,
  deleteCourseById,
  findCourseById,
  findCourses,
} from '../services/course.service';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await addCourse(req.body);
    res.status(201).json({ status: 'success', data: course });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: 'failure', error: error.message });
      return;
    }
    res.status(500).json({ error: error, status: 'failure' });
  }
};

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await findCourses();
    if (courses.length === 0) {
      res.status(404).json({ message: 'coures not found' });
      return;
    }
    res.status(200).json({ data: courses, status: 'success' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: 'failure', error: error.message });
      return;
    }
    res.status(500).json({ error, status: 'failure' });
  }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'course id is not valid' });
      return;
    }

    const course = await findCourseById(id);
    if (!course) {
      res.status(404).json({ message: 'course not found' });
      return;
    }
    res.status(200).json({ status: 'success', data: course });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: 'failure', error: error.message });
    }
    res.status(500).json({ error, status: 'failure' });
  }
};

export const removeCouresById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'course id is not valid' });
      return;
    }

    const course = await deleteCourseById(id);

    if (!course) {
      res.status(404).json({ message: 'course not found' });
      return;
    }

    res.status(204).json(course);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: 'failure', error: error.message });
    }
    res.status(500).json({ error, status: 'failure' });
  }
};
