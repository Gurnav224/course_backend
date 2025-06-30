import { create } from 'domain';
import * as v from 'valibot';

export const CourseSchema = v.object({
  title: v.pipe(v.string('Title must be a string.'), v.nonEmpty('Title is required.')),
  instructor: v.pipe(
    v.string('Instructor must be a string.'),
    v.nonEmpty('Instructor is required.')
  ),
  duration: v.pipe(v.string('Duration must be a string.'), v.nonEmpty('Duration is required.')),
  mode: v.picklist(['online', 'offline'] as const, 'Mode must be either "online" or "offline".'),
  description: v.pipe(
    v.string('Description must be a string.'),
    v.nonEmpty('Description is required.')
  ),
  prerequisites: v.pipe(
    v.string('Prerequisites must be a string.'),
    v.nonEmpty('Prerequisites are required.')
  ),
});

export type CourseType = v.InferOutput<typeof CourseSchema>;
