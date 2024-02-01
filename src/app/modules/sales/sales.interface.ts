import { TBike } from '../bike/bike.interface';

export type TSale = {
  buyerName: string;
  product: TBike;
  date: Date;
  quantity: number;
};
