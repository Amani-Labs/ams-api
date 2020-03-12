module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Addresses',
    [
      {
        Province: 'dddd',
        District: 'dddddd',
        Sector: 'ssssss',
        Cell: 'aaafdd',
        Village: 'sfasdfe',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Addresses', null, {}),
};
