/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model';

import { JwtPayload } from 'jsonwebtoken';

const getMeFromDb = async (payload: JwtPayload) => {
  const { email } = payload;
  const result = null;

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const UserServices = {
  getMeFromDb,
  changeStatus,
};
