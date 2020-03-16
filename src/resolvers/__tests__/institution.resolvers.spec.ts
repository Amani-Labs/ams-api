import { institutionResolver } from '../institution.resolver';
import * as data from '../__mocks__/resolvers.mocks';
import dbConnection from '../../config/connectDb';
import { userResolver } from '../user.resolver';

describe('Institution Resolver Tests', () => {
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

  it('Should  return error if user not superadmin during creation', async () => {
    args = data.newInstitution;
    try {
      await institutionResolver.Mutation.createInstitution(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new Error('Sorry you\'re not authorized to perform this action'));
    }
  });

  it('Should  create new Institution', async () => {
    const result = await institutionResolver.Mutation.createInstitution(
      null, data.newInstitution, superAdminToken,
    );
    expect(result.name).toEqual(data.newInstitution.name);
  });

  it('Should  return error if institution already exists', async () => {
    args = data.newInstitution;
    try {
      await institutionResolver.Mutation.createInstitution(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new Error('Institution already exists! Please check your input and try again'));
    }
  });

  it('Should  return error if user is not logged in or supplies invalid token', async () => {
    args = data.newInstitution;
    const token: any = 'invalidtoken';
    try {
      await institutionResolver.Mutation.createInstitution(null, args, token);
    } catch (error) {
      expect(error).toEqual(new Error('Please login to proceed!!'));
    }
  });

  it('Should  return all institutions', async () => {
    const result = await institutionResolver.Query.institutions(null, args, adminToken);
    expect(result[1].name).toEqual(data.newInstitution.name);
  });

  it('Should return all institutions from cache if key is set', async () => {
    const result = await institutionResolver.Query.institutions(null, args, adminToken);
    expect(result[1].name).toEqual(data.newInstitution.name);
    expect(result[1].type).toEqual(data.newInstitution.type);
  });

  it('Should  return single institution', async () => {
    args = { id: 2 };
    const result = await institutionResolver.Query.institution(null, args, adminToken);
    expect(result && result.name).toEqual(data.newInstitution.name);
  });

  it('Should  return single institution from cache after the first fetch', async () => {
    args = { id: 2 };
    const result = await institutionResolver.Query.institution(null, args, adminToken);
    expect(result && result.type).toEqual(data.newInstitution.type);
  });

  it('Should  return single institution from cache if key is set', async () => {
    args = { id: 2 };
    const result = await institutionResolver.Query.institution(null, args, adminToken);
    expect(result && result.name).toEqual(data.newInstitution.name);
    expect(result && result.type).toEqual(data.newInstitution.type);
  });

  it('Should  update a specific institution', async () => {
    args = data.updateInstitutionArgs;
    const result = await institutionResolver.Mutation.updateInstitution(
      null, args, superAdminToken,
    );
    expect(result && result.name).toEqual(data.updateInstitutionArgs.name);
  });

  it('Should  return error during update if not super-admin', async () => {
    try {
      args = data.updateInstitutionArgs;
      await institutionResolver.Mutation.updateInstitution(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new Error('Sorry you\'re not authorized to perform this action'));
    }
  });

  it('Should  return error during update if institution not found', async () => {
    try {
      args = { id: '100' };
      await institutionResolver.Mutation.updateInstitution(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new Error('Institution with Id:100 not found!'));
    }
  });

  it('Should  return error during delete if not super-admin', async () => {
    try {
      args = { id: 2 };
      await institutionResolver.Mutation.deleteInstitution(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new Error('Sorry you\'re not authorized to perform this action'));
    }
  });

  it('Should return error during delete if institution not found ', async () => {
    try {
      args = { id: 10 };
      await institutionResolver.Mutation.deleteInstitution(null, args, superAdminToken);
    } catch (error) {
      expect(error).toEqual(new Error(`Institution with Id: ${args.id} not found.`));
    }
  });

  it('Should  delete an institution', async () => {
    args = { id: 2 };
    const result = await institutionResolver.Mutation.deleteInstitution(
      null, args, superAdminToken,
    );
    expect(result.message).toEqual('Institution with id:2 deleted successfully');
  });

  it('Should  return all institutions', async () => {
    try {
      args = { id: 1 };
      await institutionResolver.Mutation.deleteInstitution(null, args, superAdminToken);
      await institutionResolver.Query.institutions(null, args, adminToken);
    } catch (error) {
      expect(error).toEqual(new Error('No Institutions found at the moment. Please add one or come back later!'));
    }
  });
});
