import { Router } from 'express';
import { signUpController, signInController } from '../controllers/auth.controller';
import { schemaVerifierMiddleware } from '../middlewares/schemaVerifier.middleware';
import { userSchemaSingUp } from '../schemasJoi/user.schema';

const router = Router();

router.post('/sign-in', signInController);

router.post('/sign-up', schemaVerifierMiddleware({body: userSchemaSingUp}), signUpController);

export { router }
