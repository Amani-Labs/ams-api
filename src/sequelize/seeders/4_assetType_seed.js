module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('AssetTypes', [{
    name: 'office',
    description: 'asdfasggga asdfasd',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('AssetTypes', null, {}),
};
