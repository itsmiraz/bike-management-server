import { Schema } from 'mongoose';

export type TSale = {
  buyerName: string;
  productId: Schema.Types.ObjectId;
  date: string;
  quantity: number;
};
