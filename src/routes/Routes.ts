import cors from 'cors';

import { Router } from "express";
import { API } from '../Environment';
import { expressHandler } from "../controllers/ExpressHandler";
import { GetCacheDataController } from "../controllers/cache/GetCacheDataController";
import { GetAllStoredKeysController } from '../controllers/cache/GetAllStoredKeysController';

export class Routes {
  public routes: Router;

  constructor() {
    this.routes = Router();

    this.configRoutes();
  }

  private configRoutes(): void {
    const options: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: `http://localhost:${API.PORT}`,
      preflightContinue: false,
    };

    // needs improvement since the more the api grows the bigger this will be
    this.routes
      .use(cors(options))
      .get("/cache/:key", expressHandler(new GetCacheDataController().handleRequest))
      .get("/cache", expressHandler(new GetAllStoredKeysController().handleRequest))

    // this.routes.options("*", cors(options));
  }

  public getRoutes(): Router {
    return this.routes;
  }
};