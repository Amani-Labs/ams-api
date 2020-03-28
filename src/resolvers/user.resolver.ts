import UserService from '../services/user.services';
import { generalValidator } from '../middlewares/general.validator';
import { loginSchema, emailSchema, resetPasswordSchema } from '../utils/schema.utils';
import { IloginData, Iuser } from '../interfaces/user.interfaces';
import { generateToken, decodeToken } from '../utils/user.utils';


export const userResolver = {
  Mutation: {
    loginUser: async <T>(_: T, args: IloginData): Promise<any> => {
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
  },
};
