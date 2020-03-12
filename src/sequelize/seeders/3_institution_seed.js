module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Institutions',
    [
      {
        name: 'makerere',
        type: 'health',
        addressId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Institutions', null, {}),
};
