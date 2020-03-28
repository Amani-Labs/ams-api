import { ApolloError, ForbiddenError } from 'apollo-server';
import requestResolver from '../request.resolvers';
import * as data from '../__mocks__/resolvers.mocks';
import dbConnection from '../../config/connectDb';
import { userResolver } from '../user.resolver';
import Redis from '../../config/redis';

describe('Address Resolver Tests', () => {
  let args: any;
  let userToken: any;

  beforeAll(async () => {
    await dbConnection;
    userToken = await userResolver.Mutation.loginUser(null, data.userCredentials);
  });

  afterAll(async () => {
    dbConnection.close();
    jest.resetAllMocks();
  });

  it('Should  create new request', async () => {
    const result = await requestResolver.Mutation.createRequest(
      null, data.newRequest, userToken,
    );
    expect(result.numberOfItems).toEqual(data.newRequest.input.numberOfItems);
  });

  it('should get all requests', async () => {
    const [asset1] = await requestResolver.Query.allRequests(null, {});
    expect(asset1.requestType).toMatch('repair');
  });

  it('should get a single request', async () => {
    const resolvedValue = await requestResolver.Query.request(null, { id: 1 });
    expect(resolvedValue && resolvedValue.requestType).toMatch('repair');
  });

  it('should be able to update a request by id', async () => {
    const resolvedValue = await requestResolver.Mutation.updateRequest(null,
      {
        id: 1,
        request: { numberOfItems: 120 },
      });
    expect(resolvedValue && resolvedValue.numberOfItems).toEqual(120);
  });

  it('should be able to delete a request using its id', async () => {
    const isAssetDelete = await requestResolver.Mutation.deleteRequest(null, { id: 2 });
    expect(isAssetDelete).toBe(true);
  });

  // Edge case testing
  it('should throw an exception if user is trying to update an non-existing request', async () => {
    const fakeID = 599;
    try {
      await requestResolver.Mutation.updateRequest(null,
        {
          id: fakeID,
          request: { numberOfItems: 120 },
        });
    } catch (error) {
      expect(error).toEqual(new Error(`Couldn’t find request with id: ${fakeID}`));
    }
  });

  it('should throw an exception if user is trying to delete an non-existing request', async () => {
    const fakeID = 595;
    try {
      await requestResolver.Mutation.deleteRequest(null, { id: fakeID });
    } catch (error) {
      expect(error).toEqual(new Error(`Couldn’t find request with ID: ${fakeID}`));
    }
  });

  it('should throw an exception if user is trying to get an non-existing request', async () => {
    const fakeID = 595;
    try {
      await requestResolver.Query.request(null, { id: fakeID });
    } catch (error) {
      expect(error).toEqual(new Error(`Couldn’t find a request with ID: ${fakeID}`));
    }
  });

  it('should fetch requests from redis cache if "allRequests" key is set', async () => {
    await Redis.save('allRequests:0-20', [data.newRequest.input]);
    const [request1] = await requestResolver.Query.allRequests(null, {});
    expect(request1.requestType).toMatch(data.newRequest.input.requestType);
  });

  it('should fetch request from redis cache if "request:{id}" key is set', async () => {
    await Redis.save('request:1', data.newRequest.input);
    const request = await requestResolver.Query.request(null, { id: 1 });
    expect(request && request.requestType).toMatch(data.newRequest.input.requestType);
  });
});
