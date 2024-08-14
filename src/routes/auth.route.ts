import { Router, Response } from 'express';
import { signUpController } from "../controllers/auth.controller";

const router = Router();

router.post('/login', (_, res: Response) => {
  res.status(200).send('API V1.0.0');
});

router.post('/sign-up', signUpController);

export { router }
