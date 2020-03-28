module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Requests', [{
    requestType: 'repair',
    assetTypeId: 1,
    status: 'pending',
    numberOfItems: 5,
    requesterId: 1,
    approvedBy: 2,
    requestedTo: 3,
    reason: 'out of stock',
    adminComment: 'okay',
    superAdminComment: 'seems reasonable',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Requests', null, {}),
};
