/* eslint-disable import/no-cycle */
import {
  Column, DataType, HasMany, Model, Table,
} from 'sequelize-typescript';

import { Asset } from './asset.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['createdAt'] },
  },
  paranoid: true,
  tableName: 'stores',
})

export class Store extends Model<Store> {
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
  address!: string;

  @HasMany(() => Asset)
  assets!: Asset[]
}
