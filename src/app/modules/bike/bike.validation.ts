import { z } from 'zod';
const createStringSchema = (fieldName: string) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be a string`,
      required_error: `${fieldName} is required`,
    })
    .transform((data) => data.trim());
const createNumberSchema = (fieldName: string) =>
  z.number({
    invalid_type_error: `${fieldName} must be a number`,
    required_error: `${fieldName} is required`,
  });

const createBikeSchema = z.object({
  body: z.object({
    name: createStringSchema('Name'),
    price: createNumberSchema('Price'),
    quantity: createNumberSchema('Quantity'),
    brand: createStringSchema('Brand'),
    model: createStringSchema('Model'),
    type: createStringSchema('Type'),
    color: createStringSchema('Color'),
    releaseDate: createStringSchema('Realease Date'),
  }),
});

export const BikeValidation = {
  createBikeSchema,
};
