import dotenv from 'dotenv';

dotenv.config();

export const API = {
  PORT: process.env.PORT || 3000,
  RECORD_TIME_TO_LIVE: process.env.RECORD_TIME_TO_LEAVE || 10,
  MAXIMUM_CACHE_ENTRIES: process.env.MAXIMUM_ENTRIES || 10,
};

export const DATABASE = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.MONGO_INITDB_DATABASE,
  DATABASE_DUMMY_COLLECTION_NAME: process.env.MONGO_DUMMY_COLLECTION_NAME,
  DATABASE_USER: process.env.MONGO_INITDB_ROOT_USERNAME,
  DATABASE_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
};
