import EventEmitter from 'events';
import sinon from 'sinon';
import chai from 'chai';
import faker from 'faker';

import { CACHE } from '../../../../src/Events';
import { CacheData } from '../../../../src/repositories/ICacheRepository';
import DeleteCacheEntryCommand from '../../../../src/commands/DeleteCacheEntryCommand';
import { deleteCacheEntryFactory } from '../../factories/cache/DeleteCacheEntryCommandFactories';

const expect = chai.expect;

describe('DeleteCacheEntryCommand', function() {
  describe('sanity tests', function() {
    it('exists', function() {
      const command = deleteCacheEntryFactory();

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it('is an instance of DeleteCacheEntryCommand', function() {
      const command = deleteCacheEntryFactory();

      expect(command).to.be.instanceof(DeleteCacheEntryCommand);
    });

    it('implements IBaseCommand correctly', function() {
      const command = deleteCacheEntryFactory();

      expect(typeof command.execute).to.be.equal('function');
    });
  });

  describe('unit tests', function() {
    it('emits a cacheEntryDeleted when cache entry was deleted', async function() {
      // given
      const key = faker.lorem.word();
      const events = new EventEmitter();
      const deleteKey = sinon.stub().resolves();

      const cacheEntryDeleted = (event: { key: string, data: CacheData }) => {
        // then
        expect(typeof event).to.be.equal('object');
        expect(deleteKey.calledOnceWith(key)).to.be.true;
      };

      events.on(CACHE.CACHE_ENTRY_DELETED, cacheEntryDeleted);

      // when
      const command = deleteCacheEntryFactory({ deleteKey });
      await command.execute(events, { key });
    });
  });
});