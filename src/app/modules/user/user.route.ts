import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidtionSchema),
  UserController.changeStatus,
);
router.get('/me', auth('admin', 'faculty', 'student'), UserController.getMe);

export const UserRoutes = router;
