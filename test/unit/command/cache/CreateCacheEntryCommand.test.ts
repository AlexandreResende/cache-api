import EventEmitter from "events";
import sinon from "sinon";
import chai from "chai";
import faker from "faker";

import { createCacheEntryFactory } from "../../factories/cache/CreateCacheEntryCommandFactory";
import { CACHE } from "../../../../src/Events";
import { CacheData } from "../../../../src/repositories/ICacheRepository";

const expect = chai.expect;

describe("GetCacheDataCommand", function() {
  describe("sanity tests", function() {
    it("implements IBaseCommand correctly", function() {
      const events = new EventEmitter();

      const command = createCacheEntryFactory(events, {});

      expect(typeof command.execute).to.be.equal('function');
    })
  });

  describe("unit tests", function() {
    it("emits a createCacheEntry when payload is valid", async function() {
      // given
      const key = faker.lorem.word();
      const data = faker.lorem.word();
      const events = new EventEmitter();
      const setCache = sinon.stub().resolves({ key, data });
      const expectedResult = { key, data };

      const cacheRetrieved = (event: { key: string, data: CacheData }) => {
        // then
        expect(event).to.be.deep.equal(expectedResult);
        expect(setCache.calledOnceWith(key, data)).to.be.true;
      }

      events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheRetrieved);

      // when
      const command = createCacheEntryFactory(events, { set: setCache });
      await command.execute({ key, data });
    });
  });
});