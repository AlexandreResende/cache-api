import { Collection } from 'mongodb';

export type UpdateFieldType = string | number;

export default class Database<T = unknown> {
  public readonly collection: Collection;

  constructor(
    collection: Collection,
  ) {
    this.collection = collection;
  }

  async findRecord(fieldName: string, key: string): Promise<T | null> {
    const condition = { [fieldName]: { $eq: key } };
    const record = await this.collection.findOne<T>(condition);

    return record;
  }

  async create(key: string, data: string): Promise<void> {
    await this.collection.insertOne({ key, data, timestamp: Date.now() });
  }

  async remove(fieldName: string, fieldValue: string): Promise<void> {
    const condition = { [fieldName]: fieldValue };

    this.collection.deleteOne(condition);
  }

  async removeAll(): Promise<void> {
    await this.collection.deleteMany({});
  }

  async updateRecord(fieldName: string, fieldValue: UpdateFieldType, updatedValues: object) {
    const condition = { [fieldName]: fieldValue };

    await this.collection.updateOne(
      condition,
      { $set: { ...updatedValues, timestamp: Date.now() } },
    );
  }

  async countEntries(): Promise<number> {
    const amountOfEntries = await this.collection.find({}).count();

    return amountOfEntries;
  }

  async getOldestEntry(): Promise<T> {
    const cursor = await this.collection.find<T>({}).sort({ 'timestamp': 1 }).limit(1);
    const entry = await cursor.toArray();

    return entry[0];
  }
}