import { Router } from 'express';
import { resetPasswordController } from "../controllers/admin.controller";

const router = Router();

router.put('/change-password-user', resetPasswordController);

export { router }
