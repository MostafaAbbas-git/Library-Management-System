import express from 'express';
import * as userController from '../controllers/user.controller';
import { validateUserInputsMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/', validateUserInputsMiddleware, userController.createUser);
router.post('/authenticate', userController.authenticate);

export default router;
