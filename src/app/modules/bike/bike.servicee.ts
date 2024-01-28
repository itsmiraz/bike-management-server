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

const getBikes = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  let searchTerm = ''; // SET DEFAULT VALUE
  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  // { email: { $regex : query.searchTerm , $options: i}}
  // { presentAddress: { $regex : query.searchTerm , $options: i}}
  // { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  const bikeSearchAbleFields = ['name', 'model', 'color', 'size'];
  // WE ARE DYNAMICALLY DOING IT USING LOOP
  const searchQuery = Bike.find({
    $or: bikeSearchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = [
    'searchTerm',
    'page',
    'limit',
    'releaseYear',
    'brand',
    'model',
    'type',
    'size',
    'color',
  ];
  excludeFields.forEach((el) => delete queryObj[el]);

  // //Pagination
  // let page = 1;
  // let limit = 10;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }

  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = Bike.find({}).skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  let minPrice = 0;

  if (query?.minPrice) {
    minPrice = Number(query?.minPrice);
  }

  const minPriceQuery = searchQuery.find({
    price: { $gte: minPrice },
  });

  let maxPrice = {};

  if (query?.maxPrice) {
    maxPrice = {
      price: { $lte: Number(query?.maxPrice) },
    };
  }

  const maxPriceQuery = minPriceQuery.find(maxPrice);

  let releaseDate = {};

  if (query?.releaseYear && query?.releaseYear !== '-') {
    releaseDate = { releaseDate: query?.releaseYear };
  }

  const releaseDateQuery = maxPriceQuery.find(releaseDate);

  let brand = {};

  if (query?.brand && query?.brand !== '-') {
    brand = { brand: query?.brand };
  }

  const brandDateQuery = releaseDateQuery.find(brand);

  let model = {};

  if (query?.model) {
    model = { model: query?.model };
  }

  const modelDateQuery = brandDateQuery.find(model);

  let type = {};

  if (query?.type && query?.type !== '-') {
    type = { type: query?.type };
  }

  const typeDateQuery = modelDateQuery.find(type);

  let size = {};

  if (query?.size) {
    size = { size: query?.size };
  }

  const sizeDateQuery = typeDateQuery.find(size);

  let color = {};

  if (query?.color && query?.color !== '-') {
    color = { color: query?.color };
  }

  const colorDateQuery = await sizeDateQuery.find(color);

  // 'color',

  const metaData = {
    // page: page,
    // limit: limit,
    total: colorDateQuery.length,
  };
  return {
    metaData,
    data: colorDateQuery,
  };
};

export const BikeServices = {
  addBikeToDb,
  updateBikeIntoDb,
  deleteBikesFromDb,
  getBikes,
};
