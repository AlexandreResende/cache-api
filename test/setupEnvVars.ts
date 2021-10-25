import faker from 'faker';

process.env.RECORD_TIME_TO_LIVE=faker.datatype.number({ min: 1, max: 100 }).toString();
process.env.MAXIMUM_CACHE_ENTRIES=faker.datatype.number({ min: 1, max: 100 }).toString();
process.env.MONGO_INITDB_DATABASE=faker.lorem.word();
process.env.MONGO_DUMMY_COLLECTION_NAME=faker.lorem.word();
process.env.MONGO_INITDB_ROOT_USERNAME=faker.lorem.word();
process.env.MONGO_INITDB_ROOT_PASSWORD=faker.lorem.word();
