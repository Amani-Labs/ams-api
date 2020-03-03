import {
  Column, DataType, Model, Table,
} from 'sequelize-typescript';

@Table({
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
  paranoid: true,
  tableName: 'users',
})

export class User extends Model<User> {
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
  password!: string

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  avatar!: string;
}

export default User;
