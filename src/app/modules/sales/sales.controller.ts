import { catchAsync } from '../../utils/catchAsync';
import { SalesService } from './sales.service';

const createAsale = catchAsync(async (req, res) => {
  const productID = req?.params?.productId;
  const result = await SalesService.createASaleintoDb(productID, req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'SuccessFully created a Sale',
    data: result,
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryFromDB(req.query);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'SuccessFully retrived History',
    data: result,
  });
});

export const SalesController = {
  createAsale,
  getSalesHistory,
};
