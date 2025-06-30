import { Request, Response } from 'express';
import { addCourse } from '../services/course.service';

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
