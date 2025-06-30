import express from 'express';
import { createCourse, getCoures } from '../controllers/course.controller';
import { validate } from '../middlewares/validate';
import { CourseSchema } from '../schema/course.valibot';

const router = express.Router();

router.post('/courses', validate(CourseSchema), createCourse);
router.get('/courses', getCoures);

export default router;
