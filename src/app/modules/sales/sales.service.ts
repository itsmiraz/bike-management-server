import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { TSale } from './sales.interface';
import { Sale } from './sales.model';

const createASaleintoDb = async (payload: TSale) => {
  const isProductExists = await Bike.findById(payload.productId);

  if (!isProductExists) {
    throw new AppError(404, 'Bike does not Exists');
  }

  if (payload.quantity > isProductExists.quantity) {
    throw new AppError(400, 'Insuffient Stock');
  }

  const newQuantity = isProductExists.quantity - payload.quantity;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // reduce the quantity from the product
    await Bike.findByIdAndUpdate(
      payload.productId,
      {
        quantity: newQuantity,
      },
      {
        new: true,
        session,
      },
    );

    const result = await Sale.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Some Thing Went Wrong');
  }
};

export const SalesService = {
  createASaleintoDb,
};
