import { Router } from 'express';
import { schemaVerifierMiddleware } from '../middlewares/schemaVerifier.middleware';
import { userListController } from '../controllers/user.controller'; 
import { paginationSchema } from '../schemasJoi/pagination.schema';
import { authorizationVerifierMiddleware } from '../middlewares/authorizationVerifier.middleware';

const router = Router();

router.get('/', [schemaVerifierMiddleware({query: paginationSchema}), authorizationVerifierMiddleware], userListController);

export { router }
