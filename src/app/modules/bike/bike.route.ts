import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';

const router = Router();

router.post(
  '/post-bike',
  validateRequest(BikeValidation.createBikeSchema),
  BikeControllers.addBike,
);
export const BikeRoutes = router;
