module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Roles', [
    {
      name: 'superAdmin',
      description: 'this is the super-admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'admin',
      description: 'this is the admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'normalUser',
      description: 'this is a normal user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
