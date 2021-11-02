import { Collection, Db } from 'mongodb';
import { inject } from 'tsyringe';

export default abstract class Database<T = unknown, K = unknown> {
  // private readonly collection: Collection;

  constructor(
    @inject('Database') private readonly db: Db
  ) {}

  public abstract get(key: string): Promise<T>;
  public abstract set(key: string, data: K): Promise<void>;
}