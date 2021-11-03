import { Collection, Db } from 'mongodb';

export default class DatabaseTransform {
  public transform(db: Db, collectionName: string): Collection {
    return db.collection(collectionName);
  }
}