import { userResolver } from '../user.resolver';
import dbConnection from '../../config/connectDb';
import { generateToken } from '../../utils/user.utils';
import { Iuser } from '../../interfaces/user.interfaces';
import 'dotenv/config';

const { SEEDER_SUPER_ADMIN_PASSWORD } = process.env;
describe('Test User Resolver', () => {
  beforeAll(async () => {
    await dbConnection;
  });

  afterAll(async (done) => {
    dbConnection.close();
    done();
  });

  it('Should login a user', async () => {
    const args = { email: 'foobar@gmail.com', password: SEEDER_SUPER_ADMIN_PASSWORD || '' }; // This user is in the seeders
    const spy = jest.spyOn(userResolver.Mutation, 'loginUser');
    await userResolver.Mutation.loginUser(null, args);
    expect(spy).toHaveBeenCalled();
  });
  it('Should throw error if email is not valid', async () => {
    const args = { email: 'invalid email', password: '12345' };
    const message = 'email must be a valid email';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (error) {
      expect(error.constructor.name).toEqual('UserInputError');
      expect(error.message).toEqual(message);
    }
  });

  it('Should throw error if email is wrong', async () => {
    const args = { email: 'wrong@email.com', password: '12345' };
    const message = 'Invalid email or password';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (error) {
      expect(error.constructor.name).toEqual('AuthenticationError');
      expect(error.message).toEqual(message);
    }
  });

  it('Should throw error if password is wrong', async () => {
    const args = { email: 'harera@gmail.com', password: 'wrong password' };
    const message = 'Invalid email or password';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (error) {
      expect(error.constructor.name).toEqual('AuthenticationError');
      expect(error.message).toEqual(message);
    }
  });

  // password reset
  it('Should send an email to the user if exists', async () => {
    const email = 'foobar@gmail.com';
    const spy = jest.spyOn(userResolver.Mutation, 'sendResetPasswordEmail');
    await userResolver.Mutation.sendResetPasswordEmail(null, { email });
    expect(spy).toHaveBeenCalled();
  });

  it('Should not send an email if user email does not exists', async () => {
    const email = 'wrong@gmail.com';
    const message = 'User with this email does not exist';
    try {
      await userResolver.Mutation.sendResetPasswordEmail(null, { email });
    } catch (error) {
      expect(error.constructor.name).toEqual('AuthenticationError');
      expect(error.message).toEqual(message);
    }
  });

  it('Should reset password', async () => {
    const password = 'butare';
    const confirmPassword = 'butare';
    const user = {
      email: 'foobar@gmail.com',
    };
    const token = generateToken(user as Iuser);
    const spy = jest.spyOn(userResolver.Mutation, 'sendResetPasswordEmail');
    await userResolver.Mutation.resetPassword(null, { password, confirmPassword }, { token });
    expect(spy).toHaveBeenCalled();
  });

  it('Should reset password', async () => {
    const password = 'butare';
    const confirmPassword = 'butare';
    const token = 'invalid token';
    try {
      await userResolver.Mutation.resetPassword(null, { password, confirmPassword }, { token });
    } catch (error) {
      expect(error.constructor.name).toEqual('ApolloError');
    }
  });

  it('should throw error if user is not verified', async () => {
    const args = { email: 'user@gmail.com', password: 'ASqw12345' };
    const message = 'Sorry, you can not log in. Please check your email and verify your account first.';
    try {
      await userResolver.Mutation.loginUser(null, args);
    } catch (err) {
      expect(err.constructor.name).toEqual('AuthenticationError');
      expect(err.message).toEqual(message);
    }
  });
});
