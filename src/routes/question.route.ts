import { Router } from 'express';
import {imageUploadMiddleware} from "../middlewares/uploadImage.middleware";
import {createQuestionController} from "../controllers/question.controller";
import {schemaVerifierMiddleware} from "../middlewares/schemaVerifier.middleware";
import {questionSchema} from "../schemasJoi/question.schema";

const router = Router();

router.post('/create-question', imageUploadMiddleware, [schemaVerifierMiddleware({body: questionSchema})], createQuestionController);

export { router };
