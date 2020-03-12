module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'foo',
        lastName: 'bar',
        userName: 'foobar',
        email: 'foobar@gmail.com',
        password: '$2b$10$fx5v0.2Z1yYFcq1EsnEkOO9EmHlwI491lGPEuGJ51DDDJ2LTU8CGG',
        roleId: 1,
        institutionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
