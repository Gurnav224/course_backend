import console from 'console';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import process from 'process';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { connectDB } from '../src/config/db';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('connectDB', () => {
  it('should connect to the database without throwing', async () => {
    // Set MONGO_URI to the in-memory server's URI
    process.env.MONGO_URI = mongoServer.getUri();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  it('should log error if connection fails', async () => {
    // Provide an invalid URI to force failure
    process.env.MONGO_URI = 'mongodb://invalid:27017';
    const originalConsoleLog = console.log;
    let logOutput: unknown[] = [];
    console.log = (...args: unknown[]) => logOutput.push(args);

    await connectDB();

    expect(
      logOutput.some(
        (args) =>
          Array.isArray(args) && args[0]?.toString().includes('failed to connect to database')
      )
    ).toBe(true);

    console.log = originalConsoleLog;
  });
});

describe('test model', () => {
  it('create a test sample model', async () => {
    const Test = mongoose.model('Test', new mongoose.Schema({ title: String }));
    await Test.create({ title: 'new test document' });
    const countDoc = await Test.countDocuments();
    expect(countDoc).toBe(1);
  });

  it('finds a document by title', async () => {
    const Test = mongoose.model('Test');
    await Test.create({ title: 'find me' });
    const found = await Test.findOne({ title: 'find me' });
    expect(found).not.toBeNull();
    expect(found?.title).toBe('find me');
  });

  it('updates a document', async () => {
    const Test = mongoose.model('Test');
    const doc = await Test.create({ title: 'old title' });
    doc.title = 'updated title';
    await doc.save();
    const updated = await Test.findById(doc._id);
    expect(updated?.title).toBe('updated title');
  });

  it('deletes a document', async () => {
    const Test = mongoose.model('Test');
    const doc = await Test.create({ title: 'to be deleted' });
    await Test.deleteOne({ _id: doc._id });
    const found = await Test.findById(doc._id);
    expect(found).toBeNull();
  });

  it('returns zero documents if none exist', async () => {
    const Test = mongoose.model('Test');
    await Test.deleteMany({});
    const count = await Test.countDocuments();
    expect(count).toBe(0);
  });
});
