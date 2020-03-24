module.exports.up = (queryInterface, DataTypes) => queryInterface.createTable('Assets', {
  serialNo: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  institutionId: {
    type: DataTypes.INTEGER,
    references: {
      model: { tableName: 'Institutions' },
      key: 'id',
    },
    allowNull: false,
  },
  assetTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: { tableName: 'AssetTypes' },
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dateAcquired: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  source: {
    type: DataTypes.ENUM('bought', 'donation', 'other'),
    allowNull: false,
  },
  donated: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  warrantyEndDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  usageStatus: {
    type: DataTypes.ENUM('inuse', 'instorage', 'damagedstore', 'disposed'),
    allowNull: false,
  },
  healthStatus: {
    allowNull: false,
    type: DataTypes.ENUM('damaged', 'repaired', 'goodcondition'),
  },
  repairCost: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recyclable: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  assetImage: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  assetCreatorId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: { tableName: 'Users' },
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
},
{ charset: 'utf8' });

module.exports.down = (queryInterface) => queryInterface.dropTable('Assets');
