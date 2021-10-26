import 'reflect-metadata';
import './src/config/di';

import connectDb from './src/infra/mongoClient';

connectDb().then(async () => {
  const { App } = await import('./src/app');
  const app = new App();

  app.listen();
});
