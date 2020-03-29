/* eslint-disable import/no-cycle */
import {
  Column, DataType, Model, Table, BelongsTo, ForeignKey,
} from 'sequelize-typescript';

import { User } from './user.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['createdAt'] },
  },
  paranoid: true,
  tableName: 'Roles',
})

export class Role extends Model<Role> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id!: number;

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

  @BelongsTo(() => User, 'id')
  user!: User
}
