import { Schema } from 'mongoose';

export type TSale = {
  buyerName: string;
  productId: Schema.Types.ObjectId;
  date: Date;
  quantity: number;
};
