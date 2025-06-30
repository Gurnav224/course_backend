import mongoose from 'mongoose';
import supertest from 'supertest';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import app from '../src/app';
import { Course as CourseModel } from '../src/models/course.model';

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connection.dropDatabase();
});

describe('POST /api/v1/courses - Create Course', () => {
  const validCourse = {
    title: 'Introduction to JavaScript',
    instructor: 'John Doe',
    duration: '4 weeks',
    mode: 'online',
    description: 'Learn the fundamentals of JavaScript programming language.',
    prerequisites: 'Basic understanding of HTML and CSS',
  };

  it('should create a new course with valid data', async () => {
    const res = await request.post('/api/v1/courses').send(validCourse).expect(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toMatchObject(validCourse);
    expect(res.body.data).toHaveProperty('_id');
  });

  it('should return 400 for missing required fields', async () => {
    const { title, ...incomplete } = validCourse;
    console.log(title);
    await request.post('/api/v1/courses').send(incomplete).expect(400);
  });

  it('should return 400 for invalid mode value', async () => {
    const invalid = { ...validCourse, mode: 'hybrid' };
    await request.post('/api/v1/courses').send(invalid).expect(400);
  });
});

describe('GET /api/v1/courses', () => {
  beforeEach(async () => {
    await CourseModel.deleteMany({});
  });

  it('retrieves all courses correctly', async () => {
    // Create two courses
    const courses = await CourseModel.create([
      {
        title: 'Course A',
        instructor: 'Instructor A',
        duration: '1w',
        mode: 'online',
        description: 'Desc A',
        prerequisites: 'None',
      },
      {
        title: 'Course B',
        instructor: 'Instructor B',
        duration: '2w',
        mode: 'offline',
        description: 'Desc B',
        prerequisites: 'Course A',
      },
    ]);

    const res = await request.get('/api/v1/courses').expect(200);
    const data = res.body.data;

    type CourseResponse = {
      _id: string;
      title: string;
      instructor: string;
      duration: string;
      mode: string;
      description: string;
      prerequisites: string;
    };

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
    expect(data.map((c: CourseResponse) => c._id)).toEqual(courses.map((c) => c._id.toString()));
  });
});

describe('GET /api/v1/courses/:id - Get course by ID', () => {
  it('returns the correct course for a valid ID', async () => {
    const course = await CourseModel.create({
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Wong',
      duration: '10 weeks',
      mode: 'offline',
      description: 'Intro to data analysis...',
      prerequisites: 'Python programming basics',
    });

    const res = await request.get(`/api/v1/courses/${course._id}`).expect(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data._id).toBe(course._id.toString());
    expect(res.body.data.title).toBe(course.title);
    expect(res.body.data.mode).toBe('offline');
  });

  it('returns 404 for non-existent ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await request.get(`/api/v1/courses/${fakeId}`).expect(404);
  });

  it('returns 400 for malformed ID', async () => {
    await request.get(`/api/v1/courses/invalid-id`).expect(400);
  });
});

describe('DELETE /api/v1/courses/:id - Delete a course', () => {
  it('deletes an existing course and returns 204', async () => {
    // Create a course
    const course = await CourseModel.create({
      title: 'Temp Course',
      instructor: 'Instructor X',
      duration: '3 weeks',
      mode: 'online',
      description: 'Temp description',
      prerequisites: 'None',
    });

    // Delete it
    await request.delete(`/api/v1/courses/${course._id}`).expect(204);

    // Verify it's removed
    const found = await CourseModel.findById(course._id);
    expect(found).toBeNull();
  });

  it('returns 404 when deleting non-existing ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await request.delete(`/api/v1/courses/${fakeId}`).expect(404);
  });

  it('returns 400 for invalid ID format', async () => {
    await request.delete('/api/v1/courses/invalid-id').expect(400);
  });
});
