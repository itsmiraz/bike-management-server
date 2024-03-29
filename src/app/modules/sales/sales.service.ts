import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { TSale } from './sales.interface';
import { Sale } from './sales.model';
import { TimelineType } from './sales.contstants';

const createASaleintoDb = async (productId: string, payload: TSale) => {
  const isProductExists = await Bike.findById(productId);

  if (!isProductExists) {
    throw new AppError(404, 'Bike does not Exists');
  }

  if (payload.quantity > isProductExists.quantity) {
    throw new AppError(400, 'Insuffient Stock');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newQuantity = isProductExists.quantity - payload.quantity;

    // reduce the quantity from the product
    const updatedProduct = await Bike.findByIdAndUpdate(
      productId,
      {
        quantity: newQuantity,
      },
      {
        new: true,
        session,
      },
    );

    const newPayload = {
      ...payload,
      product: updatedProduct,
    };
    const result = await Sale.create([newPayload], { session });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Some Thing Went Wrong');
  }
};

const getSalesHistoryFromDB = async (query: Record<string, unknown>) => {
  let startDate = {};

  switch (query?.timeline) {
    case TimelineType.DAILY:
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case TimelineType.WEEKLY:
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case TimelineType.MONTHLY:
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case TimelineType.YEARLY:
      startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      break;

    default:
      throw new AppError(400, 'Invalid timeline selected');
  }

  const result = await Sale.find({ date: { $gte: startDate } });

  return result;
};

export const SalesService = {
  createASaleintoDb,
  getSalesHistoryFromDB,
};
