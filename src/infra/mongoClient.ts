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

      let database;
      try {
        await client.connect();
        database = client.db(DATABASE.DATABASE_NAME);
      } catch (err) {
        console.error('Error after connecting to database', err);
      }

      container.registerInstance('Database', database);
    })
    .catch((error) => {
      console.error('Error connecting to database server', error);
    });
