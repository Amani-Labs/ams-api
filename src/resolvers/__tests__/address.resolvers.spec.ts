import { ApolloError, ForbiddenError } from 'apollo-server';
import { addressResolver } from '../address.resolvers';
import * as data from '../__mocks__/resolvers.mocks';
import dbConnection from '../../config/connectDb';
import { userResolver } from '../user.resolver';

describe('Address Resolver Tests', () => {
  let args: any;
  let superAdminToken: any;
  let adminToken: any;
  beforeAll(async () => {
    await dbConnection;
    superAdminToken = await userResolver.Mutation.loginUser(null, data.args1);
    adminToken = await userResolver.Mutation.loginUser(null, data.args2);
  });
  afterAll(async () => {
    dbConnection.close();
    jest.resetAllMocks();
  });

  it('Should  create new address', async () => {
    const result = await addressResolver.Mutation.createAddress(
      null, data.newAddress, superAdminToken,
    );
    expect(result.province).toEqual(data.newAddress.province);
  });

  it('Should  return error if user not superadmin during address creation', async () => {
    args = data.newAddress;
    try {
      await addressResolver.Mutation.createAddress(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new ForbiddenError('Sorry you\'re not authorized to perform this action'));
    }
  });

  it('Should  return error if address already exists', async () => {
    args = data.newAddress;
    try {
      await addressResolver.Mutation.createAddress(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new ApolloError('Address already exists! Please check your input and try again'));
    }
  });
  it('Should  return all addresses', async () => {
    const result = await addressResolver.Query.addresses(null, args, adminToken);
    expect(result[1].district).toEqual(data.newAddress.district);
  });

  it('Should return all addresses from cache if key is set', async () => {
    const result = await addressResolver.Query.addresses(null, args, adminToken);
    expect(result[1].village).toEqual(data.newAddress.village);
    expect(result[1].cell).toEqual(data.newAddress.cell);
  });

  it('Should  return single address', async () => {
    args = { id: 2 };
    const result = await addressResolver.Query.address(null, args, adminToken);
    expect(result && result.province).toEqual(data.newAddress.province);
  });

  it('Should  update a specific address', async () => {
    args = data.updateAddressArgs;
    const result = await addressResolver.Mutation.updateAddress(
      null, args, superAdminToken,
    );
    expect(result && result.district).toEqual(data.updateAddressArgs.district);
  });

  it('Should  return error during update if not super-admin', async () => {
    try {
      args = data.updateAddressArgs;
      await addressResolver.Mutation.updateAddress(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new ForbiddenError('Sorry you\'re not authorized to perform this action'));
    }
  });

  it('Should  return error during update if address not found', async () => {
    try {
      args = { id: '100' };
      await addressResolver.Mutation.updateAddress(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new ApolloError('Address with the Id: 100 not found!'));
    }
  });

  it('Should  delete an address', async () => {
    args = { id: 2 };
    const result = await addressResolver.Mutation.deleteAddress(
      null, args, superAdminToken,
    );
    expect(result.message).toEqual('Address with id:2 deleted successfully');
  });

  it('Should  return error during delete if not super-admin', async () => {
    try {
      args = { id: 2 };
      await addressResolver.Mutation.deleteAddress(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new ForbiddenError('Sorry you\'re not authorized to perform this action'));
    }
  });

  it('Should return error during delete if id not found ', async () => {
    try {
      args = { id: 10 };
      await addressResolver.Mutation.deleteAddress(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new ApolloError(`Address with Id: ${args.id} not found.`));
    }
  });

  it('Should return error if required role is not valid', async () => {
    try {
      args = { id: 10 };
      await addressResolver.Mutation.deleteAddress(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new ApolloError(`Address with Id: ${args.id} not found.`));
    }
  });

  describe('Test Redis part', () => {
    beforeAll(async () => {
      args = { id: 1 };
      await addressResolver.Mutation.deleteAddress(null, args, superAdminToken);
    });

    it('Should  return all addresses', async () => {
      try {
        await addressResolver.Query.addresses(null, args, adminToken);
      } catch (error) {
        expect(error).toEqual(new ApolloError('No addresses found at the moment. Please add one or come back later!'));
      }
    });
  });
});
