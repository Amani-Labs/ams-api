import AssetService from '../services/asset.services';
import { generalValidator } from '../middlewares/general.validator';
import { assetSchema } from '../utils/schema.utils';


const assetResolvers = {
  Query: {
    allAssets: async (parent, { offset = 0, limit = 20 }) => AssetService.getAllAssets({
      offset, limit,
    }),
    asset: async (parent, { serialNo }) => AssetService.getAssetBySerialNo(serialNo),
  },
  Mutation: {
    addAsset: async (_, asset) => {
      generalValidator(asset, assetSchema);
      return AssetService.addAsset(asset);
    },
    updateAsset: async (_, asset) => AssetService.updateAsset(asset),
    deleteAsset: async (_, { serialNo }) => AssetService.deleteAsset(serialNo),
  },
};

export default assetResolvers;
