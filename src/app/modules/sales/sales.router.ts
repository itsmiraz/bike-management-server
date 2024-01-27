import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SaleValidation } from './sales.validation';
import { SalesController } from './sales.controller';

const router = Router();

router.post(
  '/create-sale',
  validateRequest(SaleValidation.createSaleSchema),
  SalesController.createAsale,
);
export const SalesRoutes = router;
