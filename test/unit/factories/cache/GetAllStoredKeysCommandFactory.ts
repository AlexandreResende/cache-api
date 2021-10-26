import sinon from 'sinon';

import { IFindAllKeysCacheRepository } from '../../../../src/repositories/ICacheRepository';
import GetAllStoredKeysCommand from '../../../../src/commands/GetAllStoredKeysCommand';

export function getAllStoredKeysCommandFactory(
  cache: Partial<IFindAllKeysCacheRepository> = {},
) {
  const getAllKeys = sinon.stub();

  return new GetAllStoredKeysCommand(
    { getAllKeys, ...cache }
  );
}