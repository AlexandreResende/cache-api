import { Collection, Db, ObjectId } from 'mongodb';

import { CacheData, ICacheRepository } from './ICacheRepository';
import { API } from '../Environment';
import { CacheEntryEntity } from '../entities/CacheEntry';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'CacheRepository', useClass: CacheRepository }])
export default class CacheRepository implements ICacheRepository {
  private readonly collectionName = 'dummy';
  private readonly collection: Collection;

  constructor(@inject('Database') private readonly db: Db) {
    this.collection = this.db.collection(this.collectionName);
  }


  async get(key: string): Promise<CacheEntryEntity | null> {
    const record = await this.collection.findOne<CacheEntryEntity>({ key: { $eq: key } });

    return record;
  }

  async set(key: string, data: CacheData): Promise<void> {
    await this.collection.insertOne({ key, data, timestamp: Date.now() });
  }

  async getAllKeys(): Promise<string[]> {
    const cursor = await this.collection.find<CacheEntryEntity>({}, { projection: { _id: false, data: false } });
    const allValues = await cursor.toArray();

    return allValues.map((data: CacheEntryEntity) => { return data.key; });
  }

  async deleteKey(key: string): Promise<void> {
    await this.collection.deleteOne({ key });
  }

  async deleteAll(): Promise<void> {
    await this.collection.deleteMany({});
  }

  async updateWithId(id: string, updatedData: { key: string, data: string}): Promise<void> {
    await this.collection.updateOne(
      { _id: new ObjectId(id.toString()) },
      {
        $set: { ...updatedData, timestamp: Date.now() },
      }
    );
  }

  async update(key: string, data: string): Promise<void> {
    await this.collection.updateOne({ key }, { $set: { data, timestamp: Date.now() } });
  }

  async isCacheFull(): Promise<boolean> {
    const amountOfEntries = await this.collection.find({}).count();

    return amountOfEntries >= API.MAXIMUM_CACHE_ENTRIES;
  }

  async getOldestEntry(): Promise<CacheEntryEntity> {
    const cursor = await this.collection.find<CacheEntryEntity>({}).sort({ 'timestamp': 1 }).limit(1);
    const entry = await cursor.toArray();

    return entry[0];
  }
}