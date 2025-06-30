import { Course } from '../models/course.model';
import { CoureType } from '../schema/course.valibot';

export const addCourse = async (course: CoureType): Promise<CoureType> => {
  const new_course = new Course(course);
  await new_course.save();
  return new_course;
};
