module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Addresses', [{
    province: 'dddd',
    district: 'dddddd',
    sector: 'ssssss',
    cell: 'aaafdd',
    village: 'sfasdfe',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Addresses', null, {}),
};
