module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: { tableName: 'Roles' },
        key: 'id',
      },
      allowNull: false,
    }, { transaction: t }),
    queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.DataTypes.ENUM('male', 'female', 'trans'),
      defaultValue: 'male',
      allowNull: false,
    }, { transaction: t }),
    queryInterface.addColumn('Users', 'phoneNo', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    }, { transaction: t }),
    queryInterface.addColumn('Users', 'profilePic', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    }, { transaction: t }),
    queryInterface.addColumn('Users', 'institutionId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: { tableName: 'Institutions' },
        key: 'id',
      },
      allowNull: false,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'roleId', { transaction: t }),
    queryInterface.removeColumn('Users', 'gender', { transaction: t }),
    queryInterface.removeColumn('Users', 'phoneNo', { transaction: t }),
    queryInterface.removeColumn('Users', 'profilePic', { transaction: t }),
    queryInterface.removeColumn('Users', 'institutionId', { transaction: t }),
  ])),
};
