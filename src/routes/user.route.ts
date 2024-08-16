import { Router } from 'express';
import { schemaVerifierMiddleware } from '../middlewares/schemaVerifier.middleware';
import { userListController, updateUserController, deleteUserController, getUserByIdController } from '../controllers/user.controller'; 
import { paginationSchema } from '../schemasJoi/pagination.schema';
import { authorizationVerifierMiddleware } from '../middlewares/authorizationVerifier.middleware';
import { userSchemaUpdateBody, userSchemaParams } from '../schemasJoi/user.schema';

const router = Router();

router.get('/', [schemaVerifierMiddleware({query: paginationSchema}), authorizationVerifierMiddleware], userListController);
router.get('/:id', [schemaVerifierMiddleware({params: userSchemaParams}), authorizationVerifierMiddleware], getUserByIdController);
router.post('/update/:id', [schemaVerifierMiddleware({params: userSchemaParams}), schemaVerifierMiddleware({body: userSchemaUpdateBody}), authorizationVerifierMiddleware], updateUserController);
router.delete('/delete/:id', [schemaVerifierMiddleware({params: userSchemaParams}), authorizationVerifierMiddleware], deleteUserController);

export { router };
