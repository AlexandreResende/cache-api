import EventEmitter from "events";
import sinon from "sinon";
import chai from "chai";
import faker from "faker";

import { deleteCacheEntryFactory } from "../../factories/cache/DeleteCacheEntryCommandFactories";
import { CACHE } from "../../../../src/Events";
import { CacheData } from "../../../../src/repositories/ICacheRepository";
import DeleteCacheEntryCommand from "../../../../src/commands/DeleteCacheEntryCommand";

const expect = chai.expect;

describe("DeleteCacheEntryCommand", function() {
  describe("sanity tests", function() {
    it("exists", function() {
      const events = new EventEmitter();

      const command = deleteCacheEntryFactory(events, {});

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it("is an instance of DeleteCacheEntryCommand", function() {
      const events = new EventEmitter();

      const command = deleteCacheEntryFactory(events, {});

      expect(command).to.be.instanceof(DeleteCacheEntryCommand);
    });

    it("implements IBaseCommand correctly", function() {
      const events = new EventEmitter();

      const command = deleteCacheEntryFactory(events, {});

      expect(typeof command.execute).to.be.equal('function');
    })
  });

  describe("unit tests", function() {
    it("emits a allCacheEntriesDeleted when all cache entries were deleted successfully", async function() {
      // given
      const key = faker.lorem.word();
      const events = new EventEmitter();
      const deleteKey = sinon.stub().resolves();

      const deleteAllEntries = (event: { key: string, data: CacheData }) => {
        // then
        expect(typeof event).to.be.equal("object");
        expect(deleteKey.calledOnceWith(key)).to.be.true;
      }

      events.on(CACHE.ALL_CACHE_ENTRIES_DELETED, deleteAllEntries);

      // when
      const command = deleteCacheEntryFactory(events, { deleteKey });
      await command.execute({ key });
    });
  });
});