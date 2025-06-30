import type { NextFunction, Request, Response } from 'express';
import { AnySchema, parse, ValiError } from 'valibot';

// Use a generic tied to Valibot's schema type
export function validate(schema: AnySchema) {
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
