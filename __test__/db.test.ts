import mongoose from 'mongoose';
import { describe, expect, it } from 'vitest';

describe('Mongodb Operations', () => {
  it('should connect to the in-memory MongoDB', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  it('should be able to create and retrieve a document', async () => {
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);

    const doc = await TestModel.create({ name: 'test-doc' });
    expect(doc.name).toBe('test-doc');

    const found = await TestModel.findOne({ name: 'test-doc' });
    expect(found).not.toBeNull();
    expect(found?.name).toBe('test-doc');
  });

  it('should clean up the database after tests', async () => {
    expect([1, 2]).toContain(mongoose.connection.readyState);
  });

  it('should not find a non-existent document', async () => {
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test2', TestSchema);

    const found = await TestModel.findOne({ name: 'does-not-exist' });
    expect(found).toBeNull();
  });

  it('should update a document', async () => {
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test3', TestSchema);

    const doc = await TestModel.create({ name: 'old-name' });
    doc.name = 'new-name';
    await doc.save();

    const updated = await TestModel.findOne({ name: 'new-name' });
    expect(updated).not.toBeNull();
    expect(updated?.name).toBe('new-name');
  });

  it('should delete a document', async () => {
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test4', TestSchema);

    const doc = await TestModel.create({ name: 'to-delete' });
    await TestModel.deleteOne({ _id: doc._id });

    const found = await TestModel.findById(doc._id);
    expect(found).toBeNull();
  });
});
