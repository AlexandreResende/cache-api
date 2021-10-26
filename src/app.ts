import express from 'express';

import { API } from './Environment';
import routes from './routes/Routes';

export class App {
  public readonly app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
  }

  public listen(): void {
    this.app.listen(API.PORT, () => {
      console.log(`App listening on the port ${API.PORT}`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.urlencoded({ extended:  true }));
    this.app.use(express.json());
  }

  private initializeControllers(): void {
    this.app.use(routes);
  }
}