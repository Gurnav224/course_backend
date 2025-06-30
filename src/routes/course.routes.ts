import express from 'express';
import {
  createCourse,
  getCourseById,
  getCourses,
  removeCouresById,
} from '../controllers/course.controller';
import { validate } from '../middlewares/validate';
import { CourseSchema } from '../schema/course.valibot';

const router = express.Router();

router.post('/courses', validate(CourseSchema), createCourse);
router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.delete('/courses/:id', removeCouresById);

export default router;
