import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/index';

describe('Express App', () => {
  it('should return 200 and home routes', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      server: {
        hostname: 'gurnav',
        platform: 'linux',
        arch: 'x64',
      },
    });
  });
});

describe('Check API Health', () => {
  it('should return status 200 for health check and os information', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
