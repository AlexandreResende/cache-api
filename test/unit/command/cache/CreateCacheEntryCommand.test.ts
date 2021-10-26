import EventEmitter from 'events';
import sinon from 'sinon';
import chai from 'chai';
import faker from 'faker';

import { createCacheEntryFactory } from '../../factories/cache/CreateCacheEntryCommandFactory';
import { CACHE } from '../../../../src/Events';
import { CacheData } from '../../../../src/repositories/ICacheRepository';
import CreateCacheEntryCommand from '../../../../src/commands/CreateCacheEntryCommand';

const expect = chai.expect;

describe('CreateCacheEntryCommand', function() {
  describe('sanity tests', function() {
    it('exists', function() {
      const command = createCacheEntryFactory();

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it('is an instance of CreateCacheEntryCommand', function() {
      const command = createCacheEntryFactory();

      expect(command).to.be.instanceof(CreateCacheEntryCommand);
    });

    it('implements IBaseCommand correctly', function() {
      const command = createCacheEntryFactory();

      expect(typeof command.execute).to.be.equal('function');
    });
  });

  describe('unit tests', function() {
    it('emits a createCacheEntry when payload is valid', async function() {
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
      };

      events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheRetrieved);

      // when
      const command = createCacheEntryFactory({ set: setCache });
      await command.execute(events, { key, data });
    });

    it('emits a cacheEntryAlreadyExists when key passed already exists', async function() {
      // given
      const key = faker.lorem.word();
      const data = faker.lorem.word();
      const events = new EventEmitter();
      const getCache = sinon.stub().resolves({ key, data });
      const setCache = sinon.stub().resolves();
      const expectedResult = { key };

      const cacheKeyExists = (event: { key: string }) => {
        // then
        expect(event).to.be.deep.equal(expectedResult);
        expect(getCache.calledOnceWith(key)).to.be.true;
        expect(setCache.notCalled).to.be.true;
      };

      events.on(CACHE.CACHE_KEY_ALREADY_EXISTS, cacheKeyExists);

      // when
      const command = createCacheEntryFactory({ get: getCache, set: setCache });
      await command.execute(events, { key, data });
    });
  });
});