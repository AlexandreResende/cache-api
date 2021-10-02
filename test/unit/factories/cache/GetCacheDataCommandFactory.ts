import sinon from "sinon";
import { EventEmitter } from "events";

import GetCacheDataCommand from "../../../../src/commands/GetCacheDataCommand";

export function getCacheDataCommandFactory(
  events: EventEmitter,
  cache: Partial<{ get: (key: string) => {}, set: () => {} }>
) {
  const get = sinon.stub();
  const set = sinon.stub();

  return new GetCacheDataCommand(
    events,
    { get, set, ...cache }
  );
}