import 'dotenv/config';
import { userResolver } from '../user.resolver';
import dbConnection from '../../config/connectDb';
import userService from '../../services/user.services';
import Redis from '../../config/redis';
import {
  admin,
  argsSuperadmin,
  userCredentials,
  userInput,
  updateSuperAdminInput,
  existingUserEmailInput,
  existingUserNameInput,
  superAdminInput,
} from '../__mocks__/create.user.mocks';

describe('Test user', () => {
  let superAdminToken: any;
  let adminToken: any;
  let userToken: any;

  beforeAll(async () => {
    await dbConnection;
    superAdminToken = await userResolver.Mutation.loginUser(null, argsSuperadmin);
    adminToken = await userResolver.Mutation.loginUser(null, admin);
    await Redis.empty();
  });

  afterAll(async (done) => {
    dbConnection.close();
    done();
  });

  let createdUser;

  it('it should create an admin by super-admin', async () => {
    const spy = jest.spyOn(userResolver.Mutation, 'addUser');
    createdUser = await userResolver.Mutation.addUser(null, { input: userInput }, superAdminToken);
    expect(spy).toHaveBeenCalled();
    expect(createdUser.email).toEqual('newsuperadmin@gmail.com');
  });

  it('should verify a user', async () => {
    const spy = jest.spyOn(userResolver.Mutation, 'verifyEmail');
    const res = await userResolver.Mutation.verifyEmail(null, { email: 'newsuperadmin@gmail.com' }, { token: createdUser.token });
    const expected = { message: 'Your account was verified successfully' };
    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(expected);
  });

  it('should throw when username already exists', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'addUser');
      await userResolver.Mutation.addUser(null, { input: existingUserNameInput }, superAdminToken);
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'user with username useruserName already exists';
      expect(err.constructor.name).toEqual('ApolloError');
      expect(err.message).toEqual(message);
    }
  });

  it('should throw when a user is not authorized', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'addUser');
      await userResolver.Mutation.addUser(null, { input: userInput }, { token: undefined });
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      expect(err.constructor.name).toEqual('ApolloError');
    }
  });

  it('should throw an error when a user is not verified', async () => {
    try {
      const unVerifiedUser = { email: 'user@gmail.com', password: 'ASqw12345' };
      await userResolver.Mutation.loginUser(null, unVerifiedUser);
    } catch (err) {
      const message = 'Sorry, you can not log in. Please check your email and verify your account first.';
      expect(err.constructor.name).toEqual('AuthenticationError');
      expect(err.message).toEqual(message);
    }
  });

  it('should throw when the token is not valid', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'addUser');
      await userResolver.Mutation.addUser(null, { input: userInput }, { token: 'hahhah I laugh at you hahahaah ...' });
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      expect(err.constructor.name).toEqual('ApolloError');
    }
  });


  it('should throw when email already exists', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'addUser');
      await userResolver.Mutation.addUser(null, { input: existingUserEmailInput }, superAdminToken);
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'user with email newsuperadmin@gmail.com already exists';
      expect(err.constructor.name).toEqual('ApolloError');
      expect(err.message).toEqual(message);
    }
  });

  it('should throw an error when an admin is trying to create a super-admin', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'addUser');
      await userResolver.Mutation.addUser(null, { input: superAdminInput }, adminToken);
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'Sorry, admin johndoe. You are not authorized to perform this action';
      expect(err.constructor.name).toEqual('ForbiddenError');
      expect(err.message).toEqual(message);
    }
  });

  it('should update a user by super-admin', async () => {
    const spy = jest.spyOn(userResolver.Mutation, 'updateUser');
    const res = await userResolver.Mutation.updateUser(null,
      { id: 1, input: updateSuperAdminInput }, superAdminToken);
    expect(spy).toHaveBeenCalled();
    expect(res.email).toEqual('updatedemail@gmail.com');
  });

  it('should throw an error when an admin is trying to update user into super-admin', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'updateUser');
      await userResolver.Mutation.updateUser(null,
        { id: 1, input: updateSuperAdminInput }, adminToken);
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'Sorry, admin johndoe. You are not authorized to perform this action';
      expect(err.message).toEqual(message);
    }
  });

  it('should delete a user by super-admin', async () => {
    const spy = jest.spyOn(userResolver.Mutation, 'deleteUser');
    const res = await userResolver.Mutation.deleteUser(null, { id: 5 }, superAdminToken);
    expect(spy).toHaveBeenCalled();
    expect(res).toBe(true);
  });

  it('should throw an error when trying to verify a user who does not exists', async () => {
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'verifyEmail');
      await userResolver.Mutation.verifyEmail(null, { email: 'emailwhichdoesnotexist@gmail.com' }, adminToken);
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'User does not exist';
      expect(err.message).toEqual(message);
      expect(err.constructor.name).toEqual('ApolloError');
    }
  });

  it('should return a message when account verification fails', async () => {
    const spy = jest.spyOn(userResolver.Mutation, 'verifyEmail');
    const res = await userResolver.Mutation.verifyEmail(null, { email: 'user@gmail.com' }, adminToken);
    const expected = { message: 'Sorry, your account was not verified' };
    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(expected);
  });
  it('should throw when a user tries to create a user', async () => {
    userToken = await userResolver.Mutation.loginUser(null, userCredentials);
    try {
      const spy = jest.spyOn(userResolver.Mutation, 'addUser');
      await userResolver.Mutation.addUser(null, { input: userInput }, userToken);
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'Sorry you\'re not authorized to perform this action';
      expect(err.constructor.name).toEqual('ForbiddenError');
      expect(err.message).toEqual(message);
    }
  });

  it('should query all users', async () => {
    const spy = jest.spyOn(userResolver.Query, 'users');
    const res = await userResolver.Query.users(null, { });
    expect(spy).toHaveBeenCalled();
    expect(res[0].id).toBe(2);
  });

  it('should return all users from redis', async () => {
    await Redis.save('allUsers', [createdUser]);
    const spy = jest.spyOn(userResolver.Query, 'users');
    await userResolver.Query.users(null, { });
    expect(spy).toHaveBeenCalled();
  });

  let user;

  it('should query single user', async () => {
    const spy = jest.spyOn(userResolver.Query, 'user');
    user = await userResolver.Query.user(null, { id: 2 });
    expect(spy).toHaveBeenCalled();
    expect(user.id).toBe(2);
  });

  it('should throw an error when trying to query a user who does not exists', async () => {
    try {
      const spy = jest.spyOn(userResolver.Query, 'user');
      await userResolver.Query.user(null, { id: 5 });
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'user does not exist';
      expect(err.message).toEqual(message);
    }
  });

  it('should test default return in findUser switch case statement', async () => {
    await userService.findUser(2, 'something else');
  });

  let role;
  it('should query role', async () => {
    const spy = jest.spyOn(userResolver.Query, 'role');
    role = await userResolver.Query.role(null, { id: 2 });
    expect(spy).toHaveBeenCalled();
    expect(role.id).toBe(2);
  });

  it('should throw an error when trying to query a role which does not exists', async () => {
    try {
      const spy = jest.spyOn(userResolver.Query, 'user');
      await userResolver.Query.role(null, { id: 4 });
      expect(spy).toHaveBeenCalled();
    } catch (err) {
      const message = 'Role not found';
      expect(err.message).toEqual(message);
    }
  });

  it('should fetch userRole', async () => {
    const spy = jest.spyOn(userResolver.User, 'userRole');
    const res = await userResolver.User.userRole(user, null);
    expect(spy).toHaveBeenCalled();
    expect(res.name).toEqual('admin');
  });

  it('should fetch institution', async () => {
    const spy = jest.spyOn(userResolver.User, 'institution');
    const res = await userResolver.User.institution(user, null);
    expect(spy).toHaveBeenCalled();
    expect(res && res.name).toEqual('makerere');
  });

  it('should fetch users with a certain role', async () => {
    const spy = jest.spyOn(userResolver.Role, 'users');
    const res = await userResolver.Role.users(role, null);
    expect(spy).toHaveBeenCalled();
    expect(res[0].roleId).toBe(2);
  });

  it('should test sendEmailToResetPassword function', async () => {
    const res = await userService.sendEmailToResetPassword(userCredentials.email);
    const message = 'Link to reset your password sent, please check your email';
    expect(res.message).toEqual(message);
  });

  it('should throw an error when trying to send reset password email to email which does not exists', async () => {
    try {
      await userService.sendEmailToResetPassword('emailnotexists@gmail.com');
    } catch (err) {
      const message = 'User with this email does not exist';
      expect(err.message).toEqual(message);
    }
  });
});
