import { AuthenticationError, ForbiddenError, ApolloError } from 'apollo-server';
import { User } from '../sequelize/models/user.models';
import { unHashPassword, hashPassword } from '../utils/user.utils';
import { IloginData, Iuser } from '../interfaces/user.interfaces';
import emailSender from '../utils/mailer/send.mailer';
import { Role } from '../sequelize/models/role.models';
import { Institution } from '../sequelize/models/institution.models';
import Redis from '../config/redis';

class UserService {
  static async loginUser(user: IloginData) {
    const { email, password } = user;
    const findUser = await this.findUser(email, 'email');
    if (!findUser || !unHashPassword(password, findUser.password)) {
      throw new AuthenticationError('Invalid email or password');
    }
    if (findUser.verified === false) throw new AuthenticationError('Sorry, you can not log in. Please check your email and verify your account first.');
    return findUser.get() as Iuser;
  }

  static async sendEmailToResetPassword(email: string) {
    const user = await this.findUser(email, 'email');
    if (!user) {
      throw new AuthenticationError('User with this email does not exist');
    }
    await emailSender(email, 'resetPassword', user);
    return {
      message: 'Link to reset your password sent, please check your email',
    };
  }

  static async findUser(credential: string | number, option: string) {
    let user;
    switch (option) {
      case 'email':
        user = await User.findOne({ where: { email: credential } });
        break;
      case 'userName':
        user = await User.findOne({ where: { userName: credential } });
        break;
      case 'id':
        user = await User.findOne({ where: { id: credential } });
        if (!user) throw Error('user does not exist');
        return user;
      default:
        return user;
    }
    return user;
  }

  static async resetPassword(password: string, email: string) {
    const hashedPassword = hashPassword(password);
    await User.update({ password: hashedPassword }, { where: { email } });
    return {
      message: 'You have reset your password successful',
    };
  }

  static async createUser(input, { roleId: userRoleId, userName: user }): Promise<User> {
    const role = await this.findRole(userRoleId, 'userRole');
    if ((role.name === 'admin') && (input.roleId === '1')) throw new ForbiddenError(`Sorry, ${role.name} ${user}. You are not authorized to perform this action`);
    const { email, userName, password } = input;
    await this.checkUserByEmailOrUsername(email, userName);
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ ...input, password: hashedPassword });
    await emailSender(email, 'verifyEmail', newUser);
    return newUser;
  }

  static async findAllUsers(offset, limit) {
    let allUsers = await Redis.fetch('allUsers');
    if (allUsers) return allUsers;
    allUsers = await User.findAll({ offset, limit });
    await Redis.save(`allUsers:${offset}-${limit}`, allUsers);
    return allUsers;
  }

  static async updatingUser({ id, input },
    { roleId: userRoleId, userName: loggedUser }): Promise<User> {
    await this.checkAdmin(userRoleId, id, loggedUser);
    await Redis.deleteAllWithPattern('allUsers');

    const [_, value] = await User.update(input, {
      where: { id },
      returning: true,
    });
    return value[0];
  }

  static async deleteUser(id, { roleId: userRoleId, userName: loggedUser }): Promise<boolean> {
    await this.checkAdmin(userRoleId, id, loggedUser);
    await Redis.deleteAllWithPattern('allUsers');
    return !!await User.destroy({ where: { id } });
  }

  static async checkUserByEmailOrUsername(email: string, userName: string) {
    const matchEmail = await this.findUser(email, 'email');
    const matchUserName = await this.findUser(userName, 'userName');
    if (matchEmail) throw new ApolloError(`user with email ${email} already exists`, '409');
    if (matchUserName) throw new ApolloError(`user with username ${userName} already exists`, '409');
  }

  static async checkAdmin(userRoleId: number, id: number, loggedUser: string) {
    const role = await this.findRole(userRoleId, 'userRole');
    const user = await this.findUser(id, 'id');
    if ((role.name === 'admin') && (user.roleId === 1)) throw new ForbiddenError(`Sorry, ${role.name} ${loggedUser}. You are not authorized to perform this action`);
  }

  static async findRole(roleId: number, options) {
    const role: Role | null = await Role.findOne({ where: { id: roleId } });
    if (!role) throw Error('Role not found');
    if ((role && role.name === 'normalUser') && options === 'userRole') throw new ForbiddenError('Sorry you\'re not authorized to perform this action');
    return role;
  }

  static async emailVerification(email, { email: userEmail }) {
    const user = await this.findUser(email, 'email');
    if (!user) throw new ApolloError('User does not exist', '404');
    let message: string;
    if (user.email === userEmail) {
      await User.update({ verified: true }, { where: { email }, returning: true });
      message = 'Your account was verified successfully';
      return message;
    }
    message = 'Sorry, your account was not verified';
    return message;
  }

  static async findUserInstitution(user: any) {
    const res = await Institution.findOne({ where: { id: user.institutionId } });
    return res;
  }

  static async findAllUsersByRole(role) {
    return User.findAll({ where: { roleId: role.id } });
  }
}

export default UserService;
