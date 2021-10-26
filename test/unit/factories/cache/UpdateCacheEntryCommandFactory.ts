import sinon from 'sinon';

import UpdateCacheEntryCommand from '../../../../src/commands/UpdateCacheEntryCommand';
import { IUpdateCacheEntryRepository } from '../../../../src/repositories/ICacheRepository';

export function updateCacheEntryFactory(
  cache: Partial<IUpdateCacheEntryRepository> = {},
) {
  const update = sinon.stub();
  const updateWithId = sinon.stub();

  return new UpdateCacheEntryCommand(
    { update, updateWithId, ...cache },
  );
}