import { Request, Response } from 'express';
import { addCourse, findCourses } from '../services/course.service';

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

export const getCoures = async (req: Request, res: Response): Promise<void> => {
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
