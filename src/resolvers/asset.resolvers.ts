import Model from '../services/index.services';

const assetResolvers = {
  Query: {
    assets: () => Model.Asset.all(),
  },
};

export default assetResolvers;
