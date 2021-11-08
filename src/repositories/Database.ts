import { Collection } from 'mongodb';

import { logger } from '../Logger';

export type UpdateFieldType = string | number;

export default class Database<T = unknown> {
  public readonly collection: Collection;

  constructor(
    collection: Collection,
  ) {
    this.collection = collection;
  }

  async findRecord(fieldName: string, key: string): Promise<T | null> {
    try {
      const condition = { [fieldName]: { $eq: key } };
      const record = await this.collection.findOne<T>(condition);

      return record;
    } catch (e: any) {
      logger.error('Failed to find record', e);

      throw new Error(e);
    }
  }

  async create(key: string, data: string): Promise<void> {
    try {
      await this.collection.insertOne({ key, data, timestamp: Date.now() });
    } catch (e: any) {
      logger.error('Failed to create an record', e);

      throw new Error(e);
    }
  }

  async remove(fieldName: string, fieldValue: string): Promise<void> {
    try {
      const condition = { [fieldName]: fieldValue };

      this.collection.deleteOne(condition);
    } catch (e: any) {
      logger.error('Failed to remove record', e);

      throw new Error(e);
    }
  }

  async removeAll(): Promise<void> {
    try {
      await this.collection.deleteMany({});
    } catch (e: any) {
      logger.error('Failed to remove all records', e);

      throw new Error(e);
    }
  }

  async updateRecord(fieldName: string, fieldValue: UpdateFieldType, updatedValues: object) {
    try {
      const condition = { [fieldName]: fieldValue };

      await this.collection.updateOne(
        condition,
        { $set: { ...updatedValues, timestamp: Date.now() } },
      );
    } catch (e: any) {
      logger.error('Faile to update record', e);

      throw new Error(e);
    }
  }

  async countEntries(): Promise<number> {
    try {
      const amountOfEntries = await this.collection.find({}).count();

      return amountOfEntries;
    } catch (e: any) {
      logger.error('Failed to process count entries', e);

      throw new Error(e);
    }
  }

  async getOldestEntry(): Promise<T> {
    try {
      const cursor = await this.collection.find<T>({}).sort({ 'timestamp': 1 }).limit(1);
      const entry = await cursor.toArray();

      return entry[0];
    } catch (e: any) {
      logger.error('Failed to get oldest entry', e);

      throw new Error(e);
    }
  }
}