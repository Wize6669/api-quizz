import { Request, Response, NextFunction } from "express";
import Joi from "joi";

enum RequestValues {
  Body = "body",
  Query = "query",
  Headers = "headers",
  Params = "params",
}

export interface SchemasConfig {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

function getRequestPart(req: Request, requestPart: RequestValues) {
  return req[requestPart];
}

function setRequestPart(
  req: Request,
  requestPart: RequestValues,
  value: unknown
): void {
  req[requestPart] = value;
}

const schemaVerifierMiddleware = (schemas: SchemasConfig) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const [requestPart, schema] of Object.entries(schemas)) {
        const requestPartType = requestPart as RequestValues;
        if (schema != null) {
          const requestPart = getRequestPart(req, requestPartType);
          const value = await schema.validateAsync(requestPart, {
            abortEarly: false,
          });
          if (Object.values(RequestValues).includes(requestPartType)) {
            setRequestPart(req, requestPartType, value);
          }
        }
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };
}

export { schemaVerifierMiddleware }