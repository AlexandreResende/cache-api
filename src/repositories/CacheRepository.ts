import { Collection, ObjectId } from 'mongodb';

import { CacheData, ICacheRepository } from './ICacheRepository';
import { API } from '../Environment';
import { CacheEntryEntity } from '../entities/CacheEntry';
import { injectWithTransform, Lifecycle, registry, scoped } from 'tsyringe';
import Database from './Database';
import DatabaseTransform from './DatabaseTransformer';
import { logger } from '../Logger';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'CacheRepository', useClass: CacheRepository }])
export default class CacheRepository extends Database<CacheEntryEntity> implements ICacheRepository {
  private static readonly collectionName = 'dummy';

  constructor(
    @injectWithTransform(
      'Database',
      DatabaseTransform,
      CacheRepository.collectionName,
    ) private readonly _collection: Collection) {
    super(_collection);
  }


  async get(key: string): Promise<CacheEntryEntity | void> {
    const fieldName = 'key';
    const record = await this.findRecord(fieldName, key);

    if (!record) {
      return;
    }

    return record;
  }

  async set(key: string, data: CacheData): Promise<void> {
    await this.create(key, data);
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const cursor = await this.collection.find<CacheEntryEntity>({}, { projection: { _id: false, data: false } });
      const allValues = await cursor.toArray();

      return allValues.map((data: CacheEntryEntity) => { return data.key; });
    } catch (e: any) {
      logger.error('Failed to get all cache keys');

      throw new Error(e);
    }
  }

  async deleteKey(key: string): Promise<void> {
    const fieldName = 'key';

    await this.remove(fieldName, key);
  }

  async deleteAll(): Promise<void> {
    await this.removeAll();
  }

  async updateWithId(id: string, updatedData: { key: string, data: string}): Promise<void> {
    await this.collection.updateOne(
      { _id: new ObjectId(id.toString()) },
      {
        $set: { ...updatedData, timestamp: Date.now() },
      }
    );
  }

  async updateByKey(key: string, data: string): Promise<void> {
    const fieldName = 'key';

    await this.updateRecord(fieldName, key, { data });
  }

  async updateById(id: string, updatedData: { key: string, data: string}): Promise<void> {
    const fieldName = '_id';

    this.updateRecord(fieldName, id, updatedData);
  }

  async isCacheFull(): Promise<boolean> {
    const amountOfEntries = await this.countEntries();

    return amountOfEntries >= API.MAXIMUM_CACHE_ENTRIES;
  }

  async getOldestEntry(): Promise<CacheEntryEntity> {
    const oldestEntry = await this.getOldestEntry();

    return oldestEntry;
  }
}