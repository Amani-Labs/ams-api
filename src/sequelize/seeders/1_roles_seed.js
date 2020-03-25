module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Roles', [
    {
      name: 'admin',
      description: 'admin level',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      name: 'super-admin',
      description: 'super admin level',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
