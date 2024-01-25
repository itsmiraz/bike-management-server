import { catchAsync } from '../../utils/catchAsync';
import { BikeServices } from './bike.servicee';

const addBike = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await BikeServices.addBikeToDb(payload);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'SuccessFully Added  Bike',
    data: result,
  });
});

export const BikeControllers = {
  addBike,
};
