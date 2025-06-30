import supertest from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

const request = supertest(app);

describe('POST /api/v1/courses - Create Course', () => {
  let courseData: {
    title?: string;
    instructor: string;
    duration: string;
    mode: string;
    description: string;
    prerequisites: string;
  } = {
    title: 'Introduction to JavaScript',
    instructor: 'John Doe',
    duration: '4 weeks',
    mode: 'online',
    description: 'Learn the fundamentals of JavaScript programming language.',
    prerequisites: 'Basic understanding of HTML and CSS',
  };

  it('should create a new course with valid data', async () => {
    const response = await request.post('/api/v1/courses').send(courseData).expect(201);

    // Check response structure
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);

    // Verify all required fields match
    expect(response.body.data).toMatchObject(courseData);

    // Verify server-generated fields exist
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');

    // Additional validation for enum field
    expect(['online', 'offline']).toContain(response.body.data.mode);
  });

  it('should return 400 for missing required fields', async () => {
    // Remove required field
    delete courseData.title;

    await request.post('/api/v1/courses').send(courseData).expect(400);
  });

  it('should return 400 for invalid mode value', async () => {
    // Set invalid mode
    courseData.mode = 'hybrid';

    await request.post('/api/v1/courses').send(courseData).expect(400);
  });
});
