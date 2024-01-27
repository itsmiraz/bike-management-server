import { object, string, number } from 'zod';

const createSaleSchema = object({
  buyerName: string(),
  productId: string(),
  date: string(),
  quantity: number(),
});

export const SaleValidation = {
  createSaleSchema,
};
