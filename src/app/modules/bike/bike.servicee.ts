import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const addBikeToDb = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

export const BikeServices = {
  addBikeToDb,
};
