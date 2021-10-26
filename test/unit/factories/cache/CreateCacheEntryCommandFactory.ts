import sinon from 'sinon';

import { ICache } from '../../../../src/repositories/ICacheRepository';
import CreateCacheEntryCommand from '../../../../src/commands/CreateCacheEntryCommand';
import { updateOldestEntryFactory } from './UpdateOldestEntryCommandFactory';

export function createCacheEntryFactory(
  cache: Partial<ICache> = {},
) {
  const get = sinon.stub();
  const set = sinon.stub();
  const isCacheFull = sinon.stub();
  const getOldestEntry = sinon.stub();
  const update = sinon.stub();
  const updateWithId = sinon.stub();
  const updateOldestEntryCommand = updateOldestEntryFactory(
    { getOldestEntry, update, updateWithId, ...cache }
  );

  return new CreateCacheEntryCommand(
    { set, get, isCacheFull, getOldestEntry, updateWithId, update, ...cache },
    updateOldestEntryCommand,
  );
}