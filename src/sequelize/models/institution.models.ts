/* eslint-disable import/no-cycle */
import {
  Column, DataType, ForeignKey, HasMany, Model, Table, BelongsTo,
} from 'sequelize-typescript';

import { Asset } from './asset.models';
import { Address } from './address.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['createdAt'] },
  },
  paranoid: true,
  tableName: 'Institutions',
})

export class Institution extends Model<Institution> {
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
  type!: string;

  @ForeignKey(() => Address)
  @Column
  addressId!: number;

  @HasMany(() => Asset)
  assets!: Asset[];

  @BelongsTo(() => Address)
  address!: Address;
}
