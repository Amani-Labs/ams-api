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
  Province!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  District!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  Sector!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  Cell!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  Village!: string;

  @HasMany(() => Institution)
  institutions!: Institution[]
}
