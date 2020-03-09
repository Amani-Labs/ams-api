module.exports.up = (queryInterface, DataTypes) => queryInterface.createTable('assets', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recyclable: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  storeId: {
    allowNull: false,
    references: {
      key: 'id',
      model: 'stores',
    },
    type: DataTypes.INTEGER.UNSIGNED,
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
},
{ charset: 'utf8' });

module.exports.down = (queryInterface) => queryInterface.dropTable('assets');
