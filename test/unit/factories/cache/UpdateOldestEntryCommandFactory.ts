import sinon from 'sinon';

import {
  IGetOldestEntryRepository,
  IUpdateCacheEntryRepository
} from '../../../../src/repositories/ICacheRepository';
import { UpdateOldestEntryCommand } from '../../../../src/commands/UpdateOldestEntryCommand';

export function updateOldestEntryFactory(
  cache: Partial<IGetOldestEntryRepository & IUpdateCacheEntryRepository> = {},
) {
  const getOldestEntry = sinon.stub();
  const updateByKey = sinon.stub();
  const updateWithId = sinon.stub();

  return new UpdateOldestEntryCommand({ getOldestEntry, updateWithId, updateByKey, ...cache });
}