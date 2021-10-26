import EventEmitter from 'events';
import sinon from 'sinon';
import chai from 'chai';
import faker from 'faker';

import { CACHE } from '../../../../src/Events';
import { CacheData } from '../../../../src/repositories/ICacheRepository';
import UpdateCacheEntryCommand from '../../../../src/commands/UpdateCacheEntryCommand';
import { updateCacheEntryFactory } from '../../factories/cache/UpdateCacheEntryCommandFactory';

const expect = chai.expect;

describe('UpdateCacheEntryCommand', function() {
  describe('sanity tests', function() {
    it('exists', function() {
      const command = updateCacheEntryFactory();

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it('is an instance of DeleteCacheEntryCommand', function() {
      const command = updateCacheEntryFactory();

      expect(command).to.be.instanceof(UpdateCacheEntryCommand);
    });

    it('implements IBaseCommand correctly', function() {
      const command = updateCacheEntryFactory();

      expect(typeof command.execute).to.be.equal('function');
    });
  });

  describe('unit tests', function() {
    it('emits a cacheEntryUpdated when cache entry was deleted', async function() {
      // given
      const key = faker.lorem.word();
      const data = faker.lorem.word();
      const events = new EventEmitter();
      const update = sinon.stub().resolves();

      const cacheEntryDeleted = (event: { key: string, data: CacheData }) => {
        // then
        expect(typeof event).to.be.equal('object');
        expect(update.calledOnceWith(key, data)).to.be.true;
      };

      events.on(CACHE.CACHE_ENTRY_UPDATED, cacheEntryDeleted);

      // when
      const command = updateCacheEntryFactory({ update });
      await command.execute(events, { key, data });
    });
  });
});