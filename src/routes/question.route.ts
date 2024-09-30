import {Router} from 'express';
import {imageUploadMiddleware} from '../middlewares/uploadImage.middleware';
import {createQuestionController} from '../controllers/question.controller';
import {schemaVerifierMiddleware} from '../middlewares/schemaVerifier.middleware';
import {questionSchema} from '../schemasJoi/question.schema';
import multer from 'multer';
import path from 'node:path';

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// const upload = multer({
//   dest: path.join(__dirname, '..', 'uploads')
// });

const router = Router();

//router.post('/create-question', imageUploadMiddleware, [schemaVerifierMiddleware({body: questionSchema}), upload.single('question')], createQuestionController);
router.post('/', [upload.single('question')], createQuestionController);

export {router};
