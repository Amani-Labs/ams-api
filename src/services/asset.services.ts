import { Asset } from '../sequelize/models/asset.models';

class AssetService {
  static async getAllAssest() {
    return Asset.findAll();
  }
}

export default AssetService;
