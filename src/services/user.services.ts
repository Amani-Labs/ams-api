import { AuthenticationError } from 'apollo-server';
import { User } from '../sequelize/models/user.models';
import { unHashPassword } from '../utils/user.utils';
import { IloginData, Iuser } from '../interfaces/user.interfaces';


class UserService {
  static async loginUser(user: IloginData) {
    const { email, password } = user;
    const findUser = await this.findUserByEmail(email);
    if (!findUser || !unHashPassword(password, findUser.password)) {
      throw new AuthenticationError('Invalid email or password');
    }
    return findUser.get() as Iuser;
  }

  static async findUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

export default UserService;
