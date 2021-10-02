require('module-alias/register');
import express, { Application } from "express";

import { API } from "./Environment";
import { Routes } from "./routes/Routes";

export default class App {
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
    const routes = new Routes().getRoutes();

    this.app.use(routes);
  }
}