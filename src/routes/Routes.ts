import { Router } from 'express';
import { container, injectable, injectAll, Lifecycle, scoped } from 'tsyringe';
import Controller from '../controllers/Controller';
import { logger } from '../Logger';

export type HttpVerb = 'get' | 'put' | 'post' | 'delete';

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class CustomRouter {
  public readonly router: Router;

  constructor(@injectAll('Controller') private readonly controllers: Controller[]) {
    this.router = Router();

    this.controllers.forEach((controller) => {
      logger.info(`Route ${controller.method} ${controller.path} created`);

      this.router[controller.method](controller.path, controller.handleRequest);
    });

    this.router.use('*', (req) => {
      throw new Error(`Cannot ${req.method} ${req.path}`);
    });
  }
}

export default container.resolve(CustomRouter).router;