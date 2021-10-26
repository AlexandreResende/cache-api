import EventEmitter from 'events';
import sinon from 'sinon';
import chai from 'chai';
import faker from 'faker';

import { getCacheDataCommandFactory } from '../../factories/cache/GetCacheDataCommandFactory';
import { CACHE } from '../../../../src/Events';
import { CacheData } from '../../../../src/repositories/ICacheRepository';
import GetCacheDataCommand from '../../../../src/commands/GetCacheDataCommand';

const expect = chai.expect;

describe('GetCacheDataCommand', function() {
  describe('sanity tests', function() {
    it('exists', function() {
      const command = getCacheDataCommandFactory({});

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it('is an instance of GetCacheDataCommand', function() {
      const command = getCacheDataCommandFactory();

      expect(command).to.be.instanceof(GetCacheDataCommand);
    });

    it('implements IBaseCommand correctly', function() {
      const command = getCacheDataCommandFactory();

      expect(typeof command.execute).to.be.equal('function');
    });
  });

  describe('unit tests', function() {
    it('emits a cacheRetrievedEvent when key is persisted on cache', async function() {
      // given
      const key = faker.lorem.word();
      const data = faker.lorem.word();
      const events = new EventEmitter();
      const getCache = sinon.stub().resolves({ key, data });
      const expectedResult = { key, data };

      const cacheRetrieved = (event: { key: string, data: CacheData }) => {
        // then
        expect(event).to.be.deep.equal(expectedResult);
        expect(getCache.calledOnceWith(key)).to.be.true;
      };

      events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheRetrieved);

      // when
      const command = getCacheDataCommandFactory({ get:  getCache });
      await command.execute(events, { key });
    });

    it('emits a cacheNotFoundEvent when key does not exist on cache', async function() {
      // given
      const key = faker.lorem.word();
      const events = new EventEmitter();

      const getCache = sinon.stub().resolves(null);
      const setCache = sinon.stub().resolves(null);

      const cacheNotFound = (event: { key: string, data: CacheData }) => {
        // then
        expect(typeof event).to.be.equal('object');
        expect(event).to.have.property('key');
        expect(event.key).to.be.equal(key);
        expect(getCache.calledOnceWith(key)).to.be.true;
        expect(setCache.calledOnce).to.be.true;
      };

      events.on(CACHE.CACHE_NOT_FOUND_EVENT, cacheNotFound);

      // when
      const command = getCacheDataCommandFactory({ get:  getCache, set: setCache });
      await command.execute(events, { key });
    });
  });
});