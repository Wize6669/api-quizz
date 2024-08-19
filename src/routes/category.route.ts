import {Router} from 'express';
import {
  createCategoryController,
  listCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  updateCategoryController
} from "../controllers/category.controller";
import {paginationSchema} from "../schemasJoi/pagination.schema";
import {schemaVerifierMiddleware} from "../middlewares/schemaVerifier.middleware";

const router = Router();

router.post('/create-category', createCategoryController);
router.get('/', [schemaVerifierMiddleware({query: paginationSchema})], listCategoryController);
router.get('/:id', getCategoryByIdController);
router.post('/update-category/:id', updateCategoryController);
router.delete('/delete-category/:id', deleteCategoryController);

export { router };
