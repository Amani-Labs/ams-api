import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Iuser } from '../interfaces/user.interfaces';

const { JWT_SECRET_KEY } = process.env;

export const generateToken = (user: Iuser) => jwt.sign(
  {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    gender: user.gender,
    roleId: user.roleId,
    institutionId: user.institutionId,
  },
  JWT_SECRET_KEY!,
  { expiresIn: '1d' },
);

export const unHashPassword = (
  hashedPassword: string,
  compare: string,
) => bcrypt.compareSync(hashedPassword, compare);
