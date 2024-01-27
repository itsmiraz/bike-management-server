import { catchAsync } from '../../utils/catchAsync';
import { SalesService } from './sales.service';

const createAsale = catchAsync(async (req, res) => {
  const result = await SalesService.createASaleintoDb(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'SuccessFully created a Sale',
    data: result,
  });
});

export const SalesController = {
  createAsale,
};
