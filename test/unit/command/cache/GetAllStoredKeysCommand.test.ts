import EventEmitter from "events";
import sinon from "sinon";
import chai from "chai";
import faker from "faker";

import { getAllStoredKeysCommandFactory } from "../../factories/cache/GetAllStoredKeysCommandFactory";
import { CACHE } from "../../../../src/Events";
import { CacheData } from "../../../../src/repositories/ICacheRepository";
import GetAllStoredKeysCommand from "../../../../src/commands/GetAllStoredKeysCommand";

const expect = chai.expect;

describe("GetAllStoredKeysCommand", function() {
  describe("sanity tests", function() {
    it("implements IBaseCommand correctly", function() {
      it("exists", function() {
        const events = new EventEmitter();

        const command = getAllStoredKeysCommandFactory(events, {});

        expect(command).to.not.be.null;
        expect(command).to.not.be.undefined;
      });

      it("is an instance of GetAllStoredKeysCommand", function() {
        const events = new EventEmitter();

        const command = getAllStoredKeysCommandFactory(events, {});

        expect(command).to.be.instanceof(GetAllStoredKeysCommand);
      });

      const events = new EventEmitter();

      const command = getAllStoredKeysCommandFactory(events, {});

      expect(typeof command.execute).to.be.equal('function');
    })
  });

  describe("unit tests", function() {
    it("emits a getAllStoredKeysEvent when all keys were retrieved", async function() {
      // given
      const events = new EventEmitter();
      const getAllKeys = sinon.stub().resolves([]);
      const expectedResult = { keys: [] };

      const cacheRetrieved = (event: { key: string, data: CacheData }) => {
        // then
        expect(event).to.be.deep.equal(expectedResult);
        expect(getAllKeys.calledOnce).to.be.true;
      };

      events.on(CACHE.GET_ALL_STORED_KEYS_EVENT, cacheRetrieved);

      // when
      const command = getAllStoredKeysCommandFactory(events, { getAllKeys });
      await command.execute();
    });
  });
});