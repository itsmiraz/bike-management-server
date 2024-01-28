import { Schema, Types, model } from 'mongoose';
import { TSale } from './sales.interface';

const SaleSchema = new Schema<TSale>({
  buyerName: {
    type: String,
    required: true,
  },
  productId: {
    type: Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Sale = model<TSale>('Sale', SaleSchema);
