import EventEmitter from "events";
import sinon from "sinon";
import chai from "chai";
import faker from "faker";

import { deleteAllCacheEntriesFactory } from "../../factories/cache/DeleteAllCacheEntriesCommandFactory";
import { CACHE } from "../../../../src/Events";
import { CacheData } from "../../../../src/repositories/ICacheRepository";
import DeleteAllCacheEntriesCommand from "../../../../src/commands/DeleteAllCacheEntriesCommand";

const expect = chai.expect;

describe("DeleteAllCacheEntriesCommand", function() {
  describe("sanity tests", function() {
    it("exists", function() {
      const events = new EventEmitter();

      const command = deleteAllCacheEntriesFactory(events, {});

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it("is an instance of DeleteAllCacheEntriesCommand", function() {
      const events = new EventEmitter();

      const command = deleteAllCacheEntriesFactory(events, {});

      expect(command).to.be.instanceof(DeleteAllCacheEntriesCommand);
    });

    it("implements IBaseCommand correctly", function() {
      const events = new EventEmitter();

      const command = deleteAllCacheEntriesFactory(events, {});

      expect(typeof command.execute).to.be.equal('function');
    })
  });

  describe("unit tests", function() {
    it("emits a allCacheEntriesDeleted when all cache entries were deleted successfully", async function() {
      // given
      const key = faker.lorem.word();
      const data = faker.lorem.word();
      const events = new EventEmitter();
      const deleteAll = sinon.stub().resolves({ key, data });

      const deleteAllEntries = (event: { key: string, data: CacheData }) => {
        // then
        expect(typeof event).to.be.equal("object");
        expect(deleteAll.calledOnce).to.be.true;
      }

      events.on(CACHE.ALL_CACHE_ENTRIES_DELETED, deleteAllEntries);

      // when
      const command = deleteAllCacheEntriesFactory(events, { deleteAll });
      await command.execute();
    });
  });
});