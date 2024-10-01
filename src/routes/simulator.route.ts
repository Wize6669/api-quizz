import { Router } from 'express';
import {schemaVerifierMiddleware} from "../middlewares/schemaVerifier.middleware";
import {simulatorSchema, simulatorSchemaParams, updateSimulatorSchema} from "../schemasJoi/simulator.schema";
import {
  createSimulatorController, deleteSimulatorController,
  getSimulatorByIdController,
  simulatorListController, updateSimulatorController
} from "../controllers/simulator.controller";
import {paginationSchema} from "../schemasJoi/pagination.schema";

const router = Router();

router.get('/', [schemaVerifierMiddleware({query: paginationSchema})], simulatorListController);
router.get('/:id', [schemaVerifierMiddleware({params: simulatorSchemaParams})],getSimulatorByIdController);
router.post('/', [schemaVerifierMiddleware({body: simulatorSchema})],createSimulatorController);
router.post('/:id', [schemaVerifierMiddleware({params: simulatorSchemaParams}), schemaVerifierMiddleware({body: updateSimulatorSchema})], updateSimulatorController);
router.delete('/:id', [schemaVerifierMiddleware({params: simulatorSchemaParams})], deleteSimulatorController);

export { router };
