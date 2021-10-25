import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
// import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// import { MongoClient } from 'mongodb';
import './setupEnvVars';

// try {
//   sinon.stub(MongoClient.prototype, 'connect').resolves({ db: () => ({ collection: () => {} } )});
// } catch (err) {
//   console.error(err);
// }

import '../src/config/di';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.use(sinonChai);