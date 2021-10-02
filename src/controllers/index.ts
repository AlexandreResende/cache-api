import cors from 'cors';

import { Router } from "express";
import { API } from '../Environment';
import { expressHandler } from "./ExpressHandler";
import { GetCacheDataController } from "../controllers/cache/GetCacheDataController";

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

    this.routes
      .use(cors(options))
      .get("/cache/:key", expressHandler(new GetCacheDataController().handleRequest))

    // this.routes.options("*", cors(options));
  }

  public getRoutes(): Router {
    return this.routes;
  }
};