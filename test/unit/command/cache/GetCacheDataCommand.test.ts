import EventEmitter from "events";
import sinon from "sinon";
import chai from "chai";
import faker from "faker";

import { getCacheDataCommandFactory } from "../../factories/cache/GetCacheDataCommandFactory";
import { eventNames } from "process";
import { CACHE } from "../../../../src/Events";

const expect = chai.expect;

describe("GetCacheDataCommand", function() {
  describe("sanity tests", function() {
    it("implements IBaseCommand correctly", function() {
      const events = new EventEmitter();

      const command = getCacheDataCommandFactory(events, {});

      expect(typeof command.execute).to.be.equal('function');
    })
  });

  describe("unit tests", function() {
    it("emits a cacheRetrievedEvent when key is persisted on cache", async function() {
      // given
      const key = faker.lorem.word();
      const events = new EventEmitter();
      const getCache = sinon.stub().returns({ message: `key gotten: ${key}"` });
      const expectedResult = { message: `key gotten: ${key}"` };

      const cacheRetrieved = (event: { message: string }) => {
        // then
        expect(event).to.be.deep.equal(expectedResult);
        expect(getCache.calledOnceWith(key)).to.be.true;
      }

      events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheRetrieved);

      // when
      const command = getCacheDataCommandFactory(events, { get:  getCache });
      await command.execute({ key });
    });
  });
});