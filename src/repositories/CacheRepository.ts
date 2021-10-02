import { Collection, Db, Document } from "mongodb";

import { DATABASE } from "../Environment";
import { CacheData, GetCache, ICache } from "./ICacheRepository";

export default class CacheRepository implements ICache {
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
}