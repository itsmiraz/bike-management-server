import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const addBikeToDb = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const updateBikeIntoDb = async (id: string, payload: Partial<TBike>) => {
  // Check if the course exists
  const isBikeExist = await Bike.findById(id);
  if (!isBikeExist) {
    throw new AppError(404, 'Bike does not exists');
  }

  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteBikesFromDb = async (ids: [string]) => {
  const result = await Bike.deleteMany({ _id: { $in: ids } });
  return result;
};

export const BikeServices = {
  addBikeToDb,
  updateBikeIntoDb,
  deleteBikesFromDb,
};
