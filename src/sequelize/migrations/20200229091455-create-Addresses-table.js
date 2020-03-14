module.exports.up = (queryInterface, DataTypes) => queryInterface.createTable('Addresses', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  Province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  District: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Sector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cell: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Village: {
    type: DataTypes.STRING,
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
},
{
  charset: 'utf8',
});

module.exports.down = (queryInterface) => queryInterface.dropTable('Addresses');
