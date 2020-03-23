module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        name: 'admin',
        description: 'asdf dfdadsf',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
