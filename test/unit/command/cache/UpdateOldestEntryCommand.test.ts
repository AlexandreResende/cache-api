import EventEmitter from 'events';
import sinon from 'sinon';
import chai from 'chai';
import faker from 'faker';

import { CACHE } from '../../../../src/Events';
import { CacheData } from '../../../../src/repositories/ICacheRepository';
import { UpdateOldestEntryCommand } from '../../../../src/commands/UpdateOldestEntryCommand';
import { updateOldestEntryFactory } from '../../factories/cache/UpdateOldestEntryCommandFactory';

const expect = chai.expect;

describe('UpdateOldestEntryCommand', function() {
  describe('sanity tests', function() {
    it('exists', function() {
      const command = updateOldestEntryFactory({});

      expect(command).to.not.be.null;
      expect(command).to.not.be.undefined;
    });

    it('is an instance of UpdateOldestEntryCommand', function() {
      const command = updateOldestEntryFactory({});

      expect(command).to.be.instanceof(UpdateOldestEntryCommand);
    });

    it('implements IBaseCommand correctly', function() {
      const command = updateOldestEntryFactory();

      expect(typeof command.execute).to.be.equal('function');
    });
  });

  describe('unit tests', function() {
    it('emits an updatedOldestEntry when oldest data was updated', async function() {
      // given
      const key = faker.lorem.word();
      const data = faker.lorem.word();
      const id = faker.lorem.word();
      const events = new EventEmitter();
      const getOldestEntry = sinon.stub().resolves({ _id: id });
      const updateWithId = sinon.stub().resolves();

      const updateOldestEntry = (event: { key: string, data: CacheData }) => {
        // then
        expect(typeof event).to.be.equal('object');
        expect(getOldestEntry.calledOnce).to.be.true;
        expect(updateWithId.calledOnceWith(id, { key, data })).to.be.true;
      };

      events.on(CACHE.UPDATED_OLDEST_ENTRY, updateOldestEntry);

      // when
      const command = updateOldestEntryFactory({ getOldestEntry, updateWithId });
      await command.execute(events, { key, data });
    });
  });
});