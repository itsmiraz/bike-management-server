import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SaleValidation } from './sales.validation';
import { SalesController } from './sales.controller';

const router = Router();

router.get('/sales-history', SalesController.getSalesHistory);
router.post(
  '/create-sale/:productId',
  validateRequest(SaleValidation.createSaleSchema),
  SalesController.createAsale,
);
export const SalesRoutes = router;
