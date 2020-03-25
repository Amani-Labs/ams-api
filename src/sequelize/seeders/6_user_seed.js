// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
require('dotenv/config');

const salt = bcrypt.genSaltSync(10);
const { SEEDER_SUPER_ADMIN_PASSWORD } = process.env;
const superAdminPassword = bcrypt.hashSync(SEEDER_SUPER_ADMIN_PASSWORD, salt);

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'foo',
      lastName: 'bar',
      userName: 'foobar',
      email: 'foobar@gmail.com',
      password: '$2b$10$fx5v0.2Z1yYFcq1EsnEkOO9EmHlwI491lGPEuGJ51DDDJ2LTU8CGG',
      roleId: 1,
      gender: 'male',
      phoneNo: '+256785141480',
      profilePic: 'avatar.jpg',
      institutionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'foo1',
      lastName: 'bar1',
      userName: 'foobar1',
      email: 'foobar1@gmail.com',
      password: superAdminPassword,
      gender: 'male',
      phoneNo: '+256785141480',
      profilePic: 'avatar.jpg',
      institutionId: 1,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
