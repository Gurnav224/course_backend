import { Course } from '../models/course.model';
import { CourseType } from '../schema/course.valibot';

export const addCourse = async (course: CourseType): Promise<CourseType> => {
  const new_course = new Course(course);
  await new_course.save();
  return new_course;
};

export const findCourses = async (): Promise<CourseType[]> => {
  const courses = await Course.find();
  return courses;
};

export const findCourseById = async (id: string): Promise<CourseType | null> => {
  const course = await Course.findById(id);
  return course;
};

export const deleteCourseById = async (id: string): Promise<CourseType | null> => {
  const course = await Course.findByIdAndDelete(id);
  return course;
};
