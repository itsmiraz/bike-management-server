import { Schema, model } from 'mongoose';
import { TSale } from './sales.interface';
import { bikeSchema } from '../bike/bike.model';

const SaleSchema = new Schema<TSale>({
  buyerName: {
    type: String,
    required: true,
  },
  product: {
    type: bikeSchema,
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
