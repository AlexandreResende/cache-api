import { Document } from "mongodb";

export interface CacheEntryEntity extends Document {
  key: string;
  data: string;
}
