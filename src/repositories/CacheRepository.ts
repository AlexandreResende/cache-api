import { Collection, Db, Document } from "mongodb";

import { DATABASE } from "../Environment";
import { CacheData, GetCache, ICache, ICacheRepository } from "./ICacheRepository";

export default class CacheRepository implements ICacheRepository {
  private collection: Collection;

  constructor(
    private readonly _db: Db,
  ) {
    this.collection = this._db.collection(DATABASE.DATABASE_COLLECTION_NAME as string);
  }

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