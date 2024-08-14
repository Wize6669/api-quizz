import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { config } from '../config';

const jwtVerifier = (req: Request, res: Response, next: NextFunction) => {
  const PUBLIC_SECRET_KEY = config.get('PUBLIC_SECRET_KEY')

  // Extract the Bearer token from the Authorization header
  if (!req.headers.authorization) {
    return res.status(401).send("Access denied, Authorization header missing");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token === undefined) {
    return res.status(401).send("Access denied, token expired or incorrect");
  }

  // Verify the token using an appropriate authentication mechanism
  jwt.verify(token, PUBLIC_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(401).send("Access denied, token expired or incorrect");
    }
    //req.user = user;
    console.log(user)
    next();
  });
};

export { jwtVerifier };