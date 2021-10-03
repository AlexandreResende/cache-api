import { Collection, MongoClient } from "mongodb";

import { DATABASE, API } from "../Environment";

const url = `mongodb://${DATABASE.DATABASE_USER}:${DATABASE.DATABASE_PASSWORD}@database:27017`;

export const collections = async (): Promise<Record<string, Collection>> => {
  const dbName = DATABASE.DATABASE_NAME;
  const mongoDbClient = await MongoClient.connect(url);

  console.log('Connected successfully to server');

  const database = mongoDbClient.db(dbName);
  const dummyCollection = database.collection(DATABASE.DATABASE_DUMMY_COLLECTION_NAME as string);
  await dummyCollection.createIndex({ updatedAt: 1 }, { expireAfterSeconds: API.RECORD_TIME_TO_LIVE as number });

  return {
    [DATABASE.DATABASE_DUMMY_COLLECTION_NAME as string]: dummyCollection,
  }
};
