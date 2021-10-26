import sinon from 'sinon';

import { ICache } from '../../../../src/repositories/ICacheRepository';
import GetCacheDataCommand from '../../../../src/commands/GetCacheDataCommand';

export function getCacheDataCommandFactory(
  cache: Partial<ICache> = {},
) {
  const get = sinon.stub();
  const set = sinon.stub();

  return new GetCacheDataCommand(
    { get, set, ...cache }
  );
}