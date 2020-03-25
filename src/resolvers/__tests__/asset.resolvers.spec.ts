/* eslint-disable no-useless-escape */
import assetResolver from '../asset.resolvers';
import dbConnection from '../../config/connectDb';
import Redis from '../../config/redis';


describe('CRUD Assets', () => {
  let asset;

  beforeAll(async () => {
    await dbConnection;
  });

  afterAll(async (done) => {
    dbConnection.close();
    done();
  });

  beforeEach(async () => {
    asset = {
      serialNo: '134567-ysssiuy-$3253#',
      institutionId: 1,
      assetTypeId: 1,
      name: 'office chair',
      description: 'adsf asdf a',
      dateAcquired: '2020-03-17 10:05:06.487+02',
      source: 'donation',
      donated: false,
      warrantyEndDate: '2020-03-17 10:05:06.487+02',
      usageStatus: 'inuse',
      healthStatus: 'goodcondition',
      repairCost: 10.2,
      recyclable: false,
      assetImage: 'adfa.jpg',
      assetCreatorId: 1,
    };
    await Redis.empty();
  });

  // Happy path testing
  it('should create an asset', async () => {
    const spy = jest.spyOn(assetResolver.Mutation, 'addAsset');
    const newCreatedAsset = await assetResolver.Mutation.addAsset(null, asset);
    expect(spy).toHaveBeenCalled();
    expect(newCreatedAsset.serialNo).toMatch(asset.serialNo);
  });

  it('should get all assets', async () => {
    const spy = jest.spyOn(assetResolver.Query, 'allAssets');
    const [asset1] = await assetResolver.Query.allAssets(null, {});
    expect(spy).toHaveBeenCalled();
    expect(asset1.serialNo).toMatch('134567-ysssiuy-$3253#');
  });

  it('should get a single asset', async () => {
    const spy = jest.spyOn(assetResolver.Query, 'asset');
    const resolvedValue = await assetResolver.Query.asset(null, asset);

    expect(spy).toHaveBeenCalled();
    expect(resolvedValue && resolvedValue.name).toMatch('office chair');
  });

  it('should be able to update an asset by serialNo', async () => {
    const spy = jest.spyOn(assetResolver.Mutation, 'updateAsset');
    asset.name = 'office table';
    const resolvedValue = await assetResolver.Mutation.updateAsset(null, asset);
    expect(spy).toHaveBeenCalled();
    expect(resolvedValue && resolvedValue.name).toMatch('office table');
  });

  it('should be able to delete an asset using serialNo', async () => {
    const spy = jest.spyOn(assetResolver.Mutation, 'deleteAsset');
    const isAssetDelete = await assetResolver.Mutation.deleteAsset(null, asset);
    expect(spy).toHaveBeenCalled();
    expect(isAssetDelete).toBe(true);
  });

  // Edge case testing
  it('should throw an exception if user is trying to request for an non-existing asset', async () => {
    try {
      const spy = jest.spyOn(assetResolver.Query, 'asset');
      asset.serialNo = 'non-existing-asset';
      await assetResolver.Query.asset(null, asset);
      expect(spy).toHaveBeenCalled();
    } catch (error) {
      expect(error).toEqual(new Error(`Couldn’t find asset with serial number: ${asset.serialNo}`));
    }
  });

  it('should throw an exception if user is trying to update an non-existing asset', async () => {
    try {
      const spy = jest.spyOn(assetResolver.Mutation, 'updateAsset');
      asset.serialNo = 'non-existing-asset';
      await assetResolver.Mutation.updateAsset(null, asset);
      expect(spy).toHaveBeenCalled();
    } catch (error) {
      expect(error).toEqual(new Error(`Couldn’t find asset with serial number: ${asset.serialNo}`));
    }
  });

  it('should throw an exception if user is trying to delete an non-existing asset', async () => {
    try {
      const spy = jest.spyOn(assetResolver.Mutation, 'updateAsset');
      asset.serialNo = 'non-existing-asset';
      await assetResolver.Mutation.deleteAsset(null, asset);
      expect(spy).toHaveBeenCalled();
    } catch (error) {
      expect(error).toEqual(new Error(`Couldn’t find asset with serial number: ${asset.serialNo}`));
    }
  });

  it('should fetch assets from redis cache if "allAssets" key is set', async () => {
    await Redis.save('allAssets:0-20', [asset]);
    const spy = jest.spyOn(assetResolver.Query, 'allAssets');
    const [asset1] = await assetResolver.Query.allAssets(null, {});
    expect(spy).toHaveBeenCalled();
    expect(asset1.serialNo).toMatch('134567-ysssiuy-$3253#');
  });

  it('should fetch single asset from redis cache if "asset:id" key is set', async () => {
    await Redis.save(`asset:${asset.serialNo}`, asset);
    const spy = jest.spyOn(assetResolver.Query, 'asset');
    const asset1 = await assetResolver.Query.asset(null, asset);
    expect(spy).toHaveBeenCalled();
    expect(asset1 && asset1.serialNo).toMatch(asset.serialNo);
  });

  it('should check if asset already exists in the database', async () => {
    try {
      asset.serialNo = '1345670-yssshiuy-$325dhrj3#';
      const spy = jest.spyOn(assetResolver.Mutation, 'addAsset');
      await assetResolver.Mutation.addAsset(null, asset);
      await assetResolver.Mutation.addAsset(null, asset);
      expect(spy).toHaveBeenCalled();
    } catch (error) {
      expect(error.message).toEqual('Asset with serial no:1345670-yssshiuy-$325dhrj3# already exists');
    }
  });
});
