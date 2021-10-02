import sinon from "sinon";
import { EventEmitter } from "events";

import { IFindAllKeysCacheRepository } from "../../../../src/repositories/ICacheRepository";
import GetAllStoredKeysCommand from "../../../../src/commands/GetAllStoredKeysCommand";

export function getAllStoredKeysCommandFactory(
  events: EventEmitter,
  cache: Partial<IFindAllKeysCacheRepository> = {},
) {
  const getAllKeys = sinon.stub();

  return new GetAllStoredKeysCommand(
    events,
    { getAllKeys, ...cache }
  );
}