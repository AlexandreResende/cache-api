require('module-alias/register');
import 'reflect-metadata';

import { Application } from 'express';
import { Db } from 'mongodb';

import App from './src/app';

// const server = new App();

// server.listen();

export default function(database: Db): Application {
  const server = new App();

  server.listen();

  return server.app;
}

// export default server.app;
