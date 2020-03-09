/* eslint-disable import/no-cycle */
import {
  Column, BelongsTo, DataType, ForeignKey, Model, Table,
} from 'sequelize-typescript';

import { Store } from './store.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
  paranoid: true,
  tableName: 'assets',
})

export class Asset extends Model<Asset> {
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
  code!: string;

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
    type: DataType.STRING,
  })
  state!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  recyclable!: string

  @ForeignKey(() => Store)
  storeId!: number

  @BelongsTo(() => Store)
  store!: Store
}
