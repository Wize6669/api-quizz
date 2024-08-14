import { Router } from 'express';
import { signUpController, signInController } from "../controllers/auth.controller";

const router = Router();

router.post('/sign-in', signInController);

router.post('/sign-up', signUpController);

export { router }
