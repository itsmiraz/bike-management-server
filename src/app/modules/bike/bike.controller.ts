import { catchAsync } from '../../utils/catchAsync';
import { BikeServices } from './bike.servicee';

const addBike = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await BikeServices.addBikeToDb(payload);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'SuccessFully Added  Bike',
    data: result,
  });
});
const updateBike = catchAsync(async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await BikeServices.updateBikeIntoDb(id, payload);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'SuccessFully updated  Bike',
    data: result,
  });
});
const deleteBikes = catchAsync(async (req, res) => {
  const willBeDeletedBikes = req.body.deletedIds;

  const result = await BikeServices.deleteBikesFromDb(willBeDeletedBikes);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'SuccessFully Deleted Bike',
    data: result,
  });
});
const getBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getBikes(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'SuccessFully retrived Bikes',
    data: result,
  });
});

export const BikeControllers = {
  addBike,
  updateBike,
  deleteBikes,
  getBikes,
};
