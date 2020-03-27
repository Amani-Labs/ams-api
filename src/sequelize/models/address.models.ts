/* eslint-disable import/no-cycle */
import {
  Column, DataType, HasMany, Model, Table,
} from 'sequelize-typescript';

import { Institution } from './institution.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
  paranoid: true,
  tableName: 'Addresses',
})

export class Address extends Model<Address> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  province!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  district!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  sector!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  cell!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  village!: string;

  @HasMany(() => Institution)
  institutions!: Institution[]
}
