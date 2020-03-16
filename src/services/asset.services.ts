import { Asset } from '../sequelize/models/asset.models';
import Redis from '../config/redis';

class AssetService {
  static async getAllAssets({ offset, limit }): Promise<Asset[]> {
    let allAssets = await Redis.fetch(`allAssets:${offset}-${limit}`);
    if (allAssets) {
      return allAssets;
    }
    allAssets = await Asset.findAll({ offset, limit });
    await Redis.save(`allAssets:${offset}-${limit}`, allAssets);

    return allAssets;
  }

  static async getAssetBySerialNo(id): Promise<Asset | null> {
    let asset = await Redis.fetch(`asset:${id}`);
    if (asset) {
      return asset;
    }
    asset = await Asset.findOne({ where: { serialNo: id } });
    if (asset === null) {
      throw new Error(`Couldn’t find asset with serial number: ${id}`);
    }
    await Redis.save(`asset:${id}`, asset);

    return asset;
  }

  static async addAsset(asset): Promise<Asset> {
    const isAssetRegistered = await Asset.findOne({ where: { serialNo: asset.serialNo } });
    if (isAssetRegistered) {
      throw new Error(`Asset with serial no:${asset.serialNo} already exists`);
    }
    const assetSequelizeObj = await Asset.create(asset);
    await Redis.deleteAllWithPattern('allAssets');

    return assetSequelizeObj;
  }

  static async deleteAsset(serialNo): Promise<boolean> {
    const targetAsset = await Asset.findOne({ where: { serialNo } });
    if (targetAsset === null) {
      throw new Error(`Couldn’t find asset with serial number: ${serialNo}`);
    }
    await Redis.deleteAllWithPattern('allAssets');

    return !!await Asset.destroy({ where: { serialNo } });
  }

  static async updateAsset(asset): Promise<Asset> {
    const targetAsset = await Asset.findOne({ where: { serialNo: asset.serialNo } });
    if (targetAsset === null) {
      throw new Error(`Couldn’t find asset with serial number: ${asset.serialNo}`);
    }
    const [number, newAsset] = await Asset.update(asset, {
      where: {
        serialNo: asset.serialNo,
      },
      returning: true,
    });
    await Redis.deleteAllWithPattern('allAssets');

    return newAsset[number - 1];
  }
}

export default AssetService;
