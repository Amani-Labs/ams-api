function tableValues(DataTypes) {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    requestType: {
      type: DataTypes.ENUM('repair', 'donation', 'disposal', 'recyclable', 'other'),
      allowNull: false,
    },
    assetTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'AssetTypes',
        },
        key: 'id',
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'inprocess', 'approved', 'declined'),
      defaultValue: 'pending',
      allowNull: false,
    },
    numberOfItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requesterId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      allowNull: false,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      allowNull: true,
    },
    requestedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      allowNull: false,
    },
    assignedAdmins: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    adminComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    superAdminComment: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  };
}

module.exports.up = (queryInterface, DataTypes) => queryInterface.createTable('Requests', tableValues(DataTypes), { charset: 'utf8' });

module.exports.down = (queryInterface) => queryInterface.dropTable('Requests');
