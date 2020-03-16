import { Asset } from './asset.models';
import { Institution } from './institution.models';
import { User } from './user.models';
import { AssetType } from './assetType.models';
import { Address } from './address.models';
import { Role } from './role.models';
import { Request } from './requests.models';


export const models = [Request, Role, Address, AssetType, Asset, Institution, User];
