import { MongoClient } from 'mongodb';
import { container } from 'tsyringe';

import { DATABASE } from '../Environment';

const mongoConnect = async (): Promise<MongoClient> => {
  const url = DATABASE.DATABASE_URL
    ? DATABASE.DATABASE_URL
    : `mongodb://${DATABASE.DATABASE_USER}:${DATABASE.DATABASE_PASSWORD}@database:27017`;
  const client = new MongoClient(url);

  return client;
};

export default (): Promise<void> =>
  mongoConnect()
    .then(async (client) => {
      console.log(`Connected successfully to database server ${DATABASE.DATABASE_NAME}`);

      await client.connect();
      const database = client.db(DATABASE.DATABASE_NAME);

      container.registerInstance('Database', database);
    })
    .catch((error) => {
      console.error('Error connecting to database server', error);
    });
