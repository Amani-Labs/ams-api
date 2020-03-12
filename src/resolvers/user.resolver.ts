import UserService from '../services/user.services';
import { generalValidator } from '../middlewares/general.validator';
import { loginSchema } from '../utils/schema.utils';
import { IloginData, Iuser } from '../interfaces/user.interfaces';
import { generateToken } from '../utils/user.utils';


export const userResolver = {
  Mutation: {
    loginUser: async <T>(_: T, args: IloginData): Promise<any> => {
      generalValidator(args, loginSchema);
      const res = await UserService.loginUser(args);
      const token = generateToken(res as Iuser);
      return { token };
    },
  },
};
