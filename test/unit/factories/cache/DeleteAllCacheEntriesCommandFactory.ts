import sinon from 'sinon';

import { IDeleteAllCacheRepository } from '../../../../src/repositories/ICacheRepository';
import DeleteAllCacheEntriesCommand from '../../../../src/commands/DeleteAllCacheEntriesCommand';

export function deleteAllCacheEntriesFactory(
  cache: Partial<IDeleteAllCacheRepository> = {},
) {
  const deleteAll = sinon.stub();

  return new DeleteAllCacheEntriesCommand(
    { deleteAll, ...cache },
  );
}