import { Response } from 'express';
import { StatusCodes } from './HttpStatusCode';

export class HttpResponseHandler {
  private readonly response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  public static sendSuccess(response: Response, data?: object): void {
    response.status(StatusCodes.OK).send(data);
  }

  public static sendCreated(response: Response, data?: object): void {
    response.status(StatusCodes.CREATED).send(data);
  }

  public static sendNoContent(response: Response, data?: object): void {
    response.status(StatusCodes.NO_CONTENT).send(data);
  }

  public static sendForbidden(response: Response, data: object): void {
    response.status(StatusCodes.FORBIDDEN).send(data);
  }

  public static sendBadRequest(response: Response, data: object): void {
    response.status(StatusCodes.BAD_REQUEST).send(data);
  }

  public static sendNotFound(response: Response, data: object): void {
    response.status(StatusCodes.NOT_FOUND).send(data);
  }

  public static sendConflict(response: Response, data: object): void {
    response.status(StatusCodes.CONFLICT).send(data);
  }

  public static sendInternalError(response: Response, error: Error): void {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: 'An internal error occurred',
      error: error.message
    });
  }
}