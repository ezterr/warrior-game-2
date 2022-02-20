/* eslint-disable max-classes-per-file */
import { Request, Response, NextFunction } from 'express';

export class CreateWarriorValidationError extends Error {}
export class ArenaValidationError extends Error {}
export class NotFoundError extends Error {}

export async function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err);

  if (err instanceof CreateWarriorValidationError) {
    res
      .status(400)
      .render('warrior/error', {
        error: err.message,
      });
  } else if (err instanceof ArenaValidationError) {
    res
      .status(400)
      .render('arena/error', {
        error: err.message,
      });
  } else if (err instanceof NotFoundError) {
    res
      .status(404)
      .render('error', {
        error: err.message,
      });
  } else {
    res
      .status(500)
      .render('error', {
        error: 'something went wrong',
      });
  }
}
