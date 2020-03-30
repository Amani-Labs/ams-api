import { ApolloError, ForbiddenError } from 'apollo-server';
import { checkUserRole, decodeToken } from '../user.utils';
import { userResolver } from '../../resolvers/user.resolver';
import dbConnection from '../../config/connectDb';
import * as data from '../../resolvers/__mocks__/resolvers.mocks';

describe('checkUserRole tests', () => {
  let adminToken: string;
  beforeAll(async () => {
    await dbConnection;
    const { token } = await userResolver.Mutation.loginUser(null, data.args2);
    adminToken = token;
  });
  afterAll(async () => {
    dbConnection.close();
  });
  it('Should return error if wrong type of role is provided', async () => {
    try {
      await checkUserRole(adminToken, 12345);
    } catch (error) {
      expect(error).toEqual(new ApolloError('Sorry supply a valid role'));
    }
  });

  it('Should return error if wrong role is provided', async () => {
    const userRole = ['Kenya', 'Rwanda'];
    try {
      await checkUserRole(adminToken, userRole);
    } catch (error) {
      expect(error).toEqual(new ForbiddenError('Sorry you\'re not authorized to perform this action'));
    }
  });
  it('Should return error if user is not logged in or supplies invalid token', async () => {
    const token: any = 'invalidtoken';
    try {
      await decodeToken(token);
    } catch (error) {
      expect(error).toEqual(new ApolloError('Please login to proceed!!'));
    }
  });
});
