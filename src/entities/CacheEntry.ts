import { Document } from 'mongodb';

export interface CacheEntryEntity extends Document {
  id: string;
  key: string;
  data: string;
}
