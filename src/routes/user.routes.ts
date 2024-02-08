import express from 'express';
import * as userController from '../controllers/user.controller';
import { validateInputsMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.post(
  '/',
  validateInputsMiddleware(['email', 'password']),
  userController.createUser
);

router.post(
  '/authenticate',
  validateInputsMiddleware(['email', 'password']),
  userController.authenticate
);

export default router;
