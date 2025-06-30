import type { NextFunction, Request, Response } from 'express';
import { BaseIssue, BaseSchema, parse, ValiError } from 'valibot';

export function validate<
  TInput = unknown,
  TOutput = unknown,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
>(schema: BaseSchema<TInput, TOutput, TIssue>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = parse(schema, req.body);
      next();
    } catch (err) {
      if (err instanceof ValiError) {
        res.status(400).json({ error: err.issues });
        return;
      }
      next(err);
    }
  };
}
