module.exports.up = (queryInterface, DataTypes) => queryInterface.createTable('Institutions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: false,
    type: DataTypes.ENUM('health', 'educational', 'others'),
    defaultValue: 'health',
  },
  addressId: {
    type: DataTypes.INTEGER,
    references: {
      model: { tableName: 'Addresses' },
      key: 'id',
    },
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
}, { charset: 'utf8' });

module.exports.down = (queryInterface) => queryInterface.dropTable('Institutions');
