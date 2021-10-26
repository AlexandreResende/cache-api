import sinon from 'sinon';

import { IDeleteEntryCacheRepository } from '../../../../src/repositories/ICacheRepository';
import DeleteCacheEntryCommand from '../../../../src/commands/DeleteCacheEntryCommand';

export function deleteCacheEntryFactory(
  cache: Partial<IDeleteEntryCacheRepository> = {},
) {
  const deleteKey = sinon.stub();

  return new DeleteCacheEntryCommand(
    { deleteKey, ...cache },
  );
}