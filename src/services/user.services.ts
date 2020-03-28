import { AuthenticationError } from 'apollo-server';
import { User } from '../sequelize/models/user.models';
import { unHashPassword, hashPassword } from '../utils/user.utils';
import { IloginData, Iuser } from '../interfaces/user.interfaces';
import emailSender from '../utils/mailer/send.mailer';


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

  static async sendEmailToResetPassword(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new AuthenticationError('User with this email does not exist');
    }
    await emailSender(email, 'resetPassword', user);
    return {
      message: 'Link to reset your password sent, please check your email',
    };
  }

  static async resetPassword(password: string, email: string) {
    const hashedPassword = hashPassword(password);
    await User.update({ password: hashedPassword }, { where: { email } });
    return {
      message: 'You have reset your password successful',
    };
  }
}

export default UserService;
