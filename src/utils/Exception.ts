import { HttpException as NestHttpException } from '@nestjs/common';

type Status =
  | 'error.invalidParameters'
  | 'error.userAlreadyExists'
  | 'error.userNotFound'
  | 'error.invalidPassword'
  | 'error.internalServerError';

interface IResponse {
  status: Status;
  [key: string]: any;
}

/**
 * Instantiate a plain HTTP Exception.
 *
 * @example
 * `throw new HttpException()`
 *
 * @usageNotes
 * The constructor arguments define the response and the HTTP response status code.
 * - The `response` argument (required) defines the JSON response body.
 * - The `status` argument (required) defines the HTTP Status Code.
 *
 * By default, the JSON response body contains two properties:
 * - `statusCode`: the Http Status Code.
 * - `message`: a short description of the HTTP error by default; override this
 * by supplying a string in the `response` parameter.
 *
 * To override the entire JSON response body, pass an object to the `createBody`
 * method. Nest will serialize the object and return it as the JSON response body.
 *
 * The `status` argument is required, and should be a valid HTTP status code.
 * Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.
 *
 * @param response string or object describing the error condition.
 * @param status HTTP response status code.
 */
export default class HttpException {
  constructor(response: IResponse, status = 400) {
    return new NestHttpException(response, status);
  }
}
