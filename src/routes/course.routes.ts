import express from 'express';
import { createCourse } from '../controllers/course.controller';
import { validate } from '../middlewares/validate';
import { CourseSchema } from '../schema/course.valibot';

const router = express.Router();

router.post('/courses', validate(CourseSchema), createCourse);

export default router;
