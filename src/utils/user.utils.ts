import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { ApolloError } from 'apollo-server';
import { Iuser } from '../interfaces/user.interfaces';

const { JWT_SECRET_KEY } = process.env;

export const generateToken = (user: Iuser) => jwt.sign(
  {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    verified: user.verified,
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

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const decodeToken = async (token: string): Promise<any> => {
  if (!token) throw new ApolloError('Unauthorized access', '401');
  const result = await jwt.verify(token, JWT_SECRET_KEY!, (error, decoded) => {
    if (error) throw new ApolloError(`${error.name}: ${error.message}`, '400');
    return decoded;
  });
  return result;
};
export async function returnResult(results) {
  const token = await generateToken(results);
  return {
    ...results.get(),
    token,
  };
}
