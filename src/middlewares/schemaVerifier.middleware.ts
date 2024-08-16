import { Request, Response, NextFunction } from 'express';
import {Schema, ValidationError} from 'joi';



const schemaVerifierMiddleware = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error.details);
      const errors = error.details.map(({ message, path }) => ({
        message,
        path: path.join('.')
      }));
      if (errors.length > 1) {
        return res.status(400).json({errors: errors})
      }
      return res.status(400).json({error: errors[0]})
    }
  }
};

export { schemaVerifierMiddleware };
