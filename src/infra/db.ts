import { Db, MongoClient } from "mongodb";

import { DATABASE } from "../Environment";

const url = `mongodb://${DATABASE.DATABASE_USER}:${DATABASE.DATABASE_PASSWORD}@database:27017`;

export const database = async (): Promise<Db> => {
  const dbName = DATABASE.DATABASE_NAME;
  const mongoDbClient = await MongoClient.connect(url);

  console.log('Connected successfully to server');

  return mongoDbClient.db(dbName);
};
