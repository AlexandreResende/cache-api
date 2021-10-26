import { Request, Response } from 'express';
import { HttpVerb } from '../routes/Routes';

export default abstract class Controller {
  constructor(
    public readonly method: HttpVerb,
    public readonly path: string,
  ) {
    this.method = method;
    this.path = path;
  }

  public abstract handleRequest(req: Request, res: Response): Promise<void>;
}