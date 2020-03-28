/* eslint-disable import/no-cycle */
import {
  Column, BelongsTo, DataType, ForeignKey, Model, Table, HasMany,
} from 'sequelize-typescript';

import { User } from './user.models';
import { AssetType } from './assetType.models';


@Table({
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
  paranoid: true,
  tableName: 'Requests',
})

export class Request extends Model<Request> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  requestType!: string;

  @ForeignKey(() => AssetType)
  @Column
  assetTypeId!: number;

  @Column({
    defaultValue: 'pending',
    type: DataType.STRING,
  })
  status!: string;

  @Column({
    defaultValue: 'pending',
    type: DataType.ARRAY(DataType.JSON),
  })
  assignedAdmins!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  numberOfItems!: number

  @ForeignKey(() => User)
  @Column
  requesterId!: number;

  @ForeignKey(() => User)
  @Column
  approvedBy!: number;

  @ForeignKey(() => User)
  @Column
  requestedTo!: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  reason!: string

  @Column({
    type: DataType.TEXT,
  })
  adminComment!: string;

  @Column({
    type: DataType.TEXT,
  })
  superAdminComment!: string;

  @BelongsTo(() => User)
  userId!: User;

  @HasMany(() => AssetType, 'id')
  assetType!: AssetType[];
}
