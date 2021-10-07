import { Collection, Document, ObjectId } from "mongodb";

import { CacheData, ICacheRepository } from "./ICacheRepository";
import { API } from '../Environment';

export default class CacheRepository implements ICacheRepository {
  constructor(
    private readonly collection: Collection = collection,
  ) { }

  async get(key: string): Promise<Document | null> {
    const record = await this.collection.findOne({ key: { $eq: key } });

    return record;
  }

  async set(key: string, data: CacheData): Promise<void> {
    await this.collection.insertOne({ key, data, timestamp: Date.now() });
  }

  async getAllKeys(): Promise<Document> {
    const cursor = await this.collection.find({}, { projection: { _id: false, data: false } });
    const allValues = await cursor.toArray();

    return allValues.map((data: Document) => { return data.key; });;
  }

  async deleteKey(key: string): Promise<void> {
    await this.collection.deleteOne({ key });
  }

  async deleteAll(): Promise<void> {
    await this.collection.deleteMany({});
  }

  async updateWithId(id: string, updatedData: { key: string, data: string}): Promise<void> {
    await this.collection.updateOne({
      _id: new ObjectId(id.toString()) },
      { $set: { ...updatedData, timestamp: Date.now() },
    });
  }

  async update(key: string, data: string): Promise<void> {
    await this.collection.updateOne({ key }, { $set: { data, timestamp: Date.now() } });
  }

  async isCacheFull(): Promise<boolean> {
    const amountOfEntries = await this.collection.find({}).count();

    return amountOfEntries >= API.MAXIMUM_CACHE_ENTRIES;
  }

  async getOldestEntry(): Promise<Document> {
    const cursor = await this.collection.find({}).sort({ "timestamp": 1 }).limit(1);
    const entry = await cursor.toArray();

    return entry[0];
  }
}