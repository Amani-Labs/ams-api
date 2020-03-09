import AssetService from '../services/asset.services';

const assetResolvers = {
  Query: {
    assets: () => AssetService.getAllAssest,
  },
};

export default assetResolvers;
