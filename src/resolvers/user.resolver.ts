import { IResolvers } from 'apollo-server';
import { User } from '../sequelize/models/user.models';
import UserService from '../services/user.services';
import { generalValidator } from '../middlewares/general.validator';
import {
  loginSchema, emailSchema, resetPasswordSchema, userSchema,
} from '../utils/schema.utils';
import { IloginData, Iuser, Token } from '../interfaces/user.interfaces';
import {
  generateToken, returnResult, decodeToken,
} from '../utils/user.utils';


export const userResolver = {
  Query: {
    users: (_, { offset = 0, limit = 10 }) => UserService.findAllUsers(offset, limit),
    user: async (_, { id }) => UserService.findUser(id, 'id'),
    role: async (_, { id }) => UserService.findRole(id, 'roleQuery'),
  },
  Mutation: {
    loginUser: async (_: unknown, args: IloginData): Promise<Token> => {
      generalValidator(args, loginSchema);
      const res = await UserService.loginUser(args);
      const token = generateToken(res as Iuser);
      return { token };
    },
    sendResetPasswordEmail: async <T>(_: T, { email }): Promise<any> => {
      generalValidator({ email }, emailSchema);
      const res = await UserService.sendEmailToResetPassword(email);
      return res;
    },
    resetPassword: async <T>(_: T, { password, confirmPassword }, { token }) => {
      const { email } = await decodeToken(token);
      generalValidator({ password, confirmPassword }, resetPasswordSchema);
      const res = await UserService.resetPassword(password, email);
      return res;
    },
    addUser: async (_, { input }, { token }) => {
      const decodedUser = await decodeToken(token);
      generalValidator(input, userSchema);
      const results = await UserService.createUser(input, decodedUser);
      return returnResult(results);
    },
    updateUser: async (_, { id, input }, { token }): Promise<User> => {
      const decodedUser = await decodeToken(token);
      const res = await UserService.updatingUser({ id, input }, decodedUser);
      return returnResult(res);
    },
    deleteUser: async (_, { id }, { token }): Promise<boolean> => {
      const decodedUser = await decodeToken(token);
      return !!await UserService.deleteUser(id, decodedUser);
    },
    verifyEmail: async (_, { email }, { token }): Promise<unknown> => {
      const decodedUser = await decodeToken(token);
      const message = await UserService.emailVerification(email, decodedUser);
      return { message };
    },
  },
  User: {
    userRole: async (user, __) => {
      const res = await UserService.findRole(user.roleId, 'userQuery');
      return res;
    },
    institution: async (user, __) => {
      const results = await UserService.findUserInstitution(user);
      return results;
    },
  },
  Role: {
    users: async (role, __) => {
      const res = UserService.findAllUsersByRole(role);
      return res;
    },
  },
};
