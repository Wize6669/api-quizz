import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { config } from '../config';
import { UserMiddleware } from '../model/user';

declare module 'express' {
  interface Request {
    user?: UserMiddleware;
  }
}

const authorizationVerifierMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const PUBLIC_SECRET_KEY = config.get('PUBLIC_SECRET_KEY')

  // Extract the Bearer token from the Authorization header
  if (!req.headers.authorization) {

    return res.status(401).send("Unauthorized: Authorization header missing");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token === undefined) {

    return res.status(401).send("Unauthorized: Access is denied due to missing or invalid token");
  }

  // Verify the token using an appropriate authentication mechanism
  jwt.verify(token, PUBLIC_SECRET_KEY, (error, decodedToken) => {
    if (error) {
      return res.status(401).send("Unauthorized: Access is denied due to missing or invalid token");
    }

    if (typeof decodedToken === 'object' && decodedToken !== null) {
      const user = decodedToken as UserMiddleware;

      if (user.roleId !== 1 && user.roleId !== 2) {

        return res.status(403).send("Forbidden: You do not have permission to access this resource. Your token is invalid or has expired");
      }

      req.user = user;
    }

    next();
  });
};

export { authorizationVerifierMiddleware };
