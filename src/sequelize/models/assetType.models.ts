/* eslint-disable import/no-cycle */
import {
  Column, DataType, Model, Table, BelongsTo,
} from 'sequelize-typescript';

import { Asset } from './asset.models';
import { Request } from './requests.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['createdAt'] },
  },
  paranoid: true,
  tableName: 'AssetTypes',
})

export class AssetType extends Model<AssetType> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  description!: string;

  @BelongsTo(() => Asset, 'assetTypedId')
  assetNo!: Asset;

  @BelongsTo(() => Request, 'assetTypeId')
  request!: Request
}
