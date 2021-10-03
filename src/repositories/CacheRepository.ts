import { Collection, Db, Document } from "mongodb";

import { DATABASE, API } from "../Environment";
import { CacheData, ICacheRepository } from "./ICacheRepository";

export default class CacheRepository implements ICacheRepository {
  constructor(
    private readonly collection: Collection = collection,
  ) { }

  async get(key: string): Promise<Document | null> {
    const record = await this.collection.findOne({ key: { $eq: key } });

    return record;
  }

  async set(key: string, data: CacheData): Promise<void> {
    await this.collection.insertOne({ key, data });
  }

  async getAllKeys(): Promise<Document> {
    const cursor = await this.collection.find({}, { projection: { _id: false, data: false } });
    const allValues = await cursor.toArray();

    return allValues.map((data: Document) => { return data.key; });;
  }
}