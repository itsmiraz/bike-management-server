import { z } from 'zod';

const createSaleSchema = z.object({
  body: z.object({
    buyerName: z.string(),
    productId: z.string(),
    date: z.string(),
    quantity: z.number(),
  }),
});

export const SaleValidation = {
  createSaleSchema,
};
