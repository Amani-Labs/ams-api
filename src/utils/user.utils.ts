import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { ApolloError, ForbiddenError } from 'apollo-server';
import { Iuser } from '../interfaces/user.interfaces';
import { Role } from '../sequelize/models/role.models';

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

export const decodeToken = async (token: string) => {
  let user;
  await jwt.verify(token, JWT_SECRET_KEY!, (error, decoded) => {
    if (error) {
      throw new ApolloError('Please login to proceed!!');
    }
    user = decoded;
  });
  return user;
};
export const checkSingleRole = async (role, requiredRole) => {
  if (role!.name !== requiredRole) {
    throw new ForbiddenError('Sorry you\'re not authorized to perform this action');
  }
  return true;
};

export const checkCombinedRoles = async (role, requiredRole) => {
  if (!Array.isArray(requiredRole)) {
    throw new ApolloError('Sorry supply a valid role');
  }
  if (!requiredRole.includes(role.name)) {
    throw new ForbiddenError('Sorry you\'re not authorized to perform this action');
  }
};

export const checkUserRole = async (token, requiredRole) => {
  const { roleId } = await decodeToken(token);
  // Update this method to use role-service .
  const role = await Role.findOne({ where: { id: roleId } });
  if (typeof requiredRole === 'string') {
    await checkSingleRole(role, requiredRole);
  } else {
    await checkCombinedRoles(role, requiredRole);
  }
};

export const userGroup = {
  admins: ['superAdmin', 'admin'],
  users: ['superAdmin', 'admin', 'normalUser'],
  superAdmin: 'superAdmin',
  admin: 'admin',
  user: 'normalUser',
};
export async function returnResult(results) {
  const token = await generateToken(results);
  return {
    ...results.get(),
    token,
  };
}
