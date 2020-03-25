/* eslint-disable import/no-cycle */
import {
  Column, BelongsTo, DataType, ForeignKey, HasOne, Model, Table,
} from 'sequelize-typescript';

import { Institution } from './institution.models';
import { User } from './user.models';
import { AssetType } from './assetType.models';


@Table({
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
  paranoid: true,
  tableName: 'Assets',
})

export class Asset extends Model<Asset> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.STRING,
  })
  serialNo!: string;

  @ForeignKey(() => Institution)
  @Column
  institutionId!: number;

  @ForeignKey(() => AssetType)
  @Column
  assetTypeId!: number;

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

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  dateAcquired!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  source!: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  donated!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  warrantyEndDate!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  usageStatus!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  healthStatus!: string

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  repairCost!: string

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  recyclable!: string;


  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  assetImage!: string;

  @ForeignKey(() => User)
  @Column
  assetCreatorId!: number;

  @BelongsTo(() => Institution)
  institution!: Institution;

  @BelongsTo(() => User)
  user!: User;

  @HasOne(() => AssetType, 'id')
  assetType!: AssetType;
}
