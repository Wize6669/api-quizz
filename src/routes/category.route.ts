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
import {categorySchemaCreateUpdate, categorySchemaParams} from "../schemasJoi/category.schema";

const router = Router();

router.post('/', [schemaVerifierMiddleware({body: categorySchemaCreateUpdate})],createCategoryController);
router.get('/', [schemaVerifierMiddleware({query: paginationSchema})], listCategoryController);
router.get('/:id', [schemaVerifierMiddleware({params: categorySchemaParams})],getCategoryByIdController);
router.post('/:id', [schemaVerifierMiddleware({params: categorySchemaParams}), schemaVerifierMiddleware({body: categorySchemaCreateUpdate})],updateCategoryController);
router.delete('/:id',  [schemaVerifierMiddleware({params: categorySchemaParams})],deleteCategoryController);

export { router };
