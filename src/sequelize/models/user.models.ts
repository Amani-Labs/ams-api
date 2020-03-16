/* eslint-disable import/no-cycle */
import {
  Column, DataType, HasMany, ForeignKey, Model, Table, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { Asset } from './asset.models';
import { Institution } from './institution.models';
import { Role } from './role.models';
import { Request } from './requests.models';

@Table({
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
  paranoid: true,
  tableName: 'Users',
})

export class User extends Model<User> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: string;

  @ForeignKey(() => Role)
  @Column
  roleId!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  firstName!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  lastName!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  userName!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  gender!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  phoneNo!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  profilePic!: string;

  @ForeignKey(() => Institution)
  @Column
  institutionId!: number;

  @HasMany(() => Asset)
  createdAsset!: Asset;

  @HasOne(() => Role, 'id')
  roleType!: Role;

  @BelongsTo(() => Institution, 'id')
  institution!: Institution;

  @HasMany(() => Request)
  requestId!: Request;
}

export default User;
