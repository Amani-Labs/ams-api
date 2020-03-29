// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
require('dotenv/config');

const salt = bcrypt.genSaltSync(10);
const { SEEDER_SUPER_ADMIN_PASSWORD, SEEDER_USER_PASSWORD, SEEDER_ADMIN_PASSWORD } = process.env;
const superAdminPassword = bcrypt.hashSync(SEEDER_SUPER_ADMIN_PASSWORD, salt);
const userPassword = bcrypt.hashSync(SEEDER_USER_PASSWORD, salt);
const adminPassword = bcrypt.hashSync(SEEDER_ADMIN_PASSWORD, salt);

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'foo',
      lastName: 'bar',
      userName: 'foobar',
      email: 'foobar@gmail.com',
      password: superAdminPassword,
      roleId: 1,
      gender: 'male',
      phoneNo: '+256785141480',
      profilePic: 'avatar.jpg',
      verified: true,
      institutionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'John',
      lastName: 'doe',
      userName: 'johndoe',
      email: 'foobar1@gmail.com',
      password: adminPassword,
      gender: 'male',
      phoneNo: '+256785141480',
      profilePic: 'avatar.jpg',
      institutionId: 1,
      roleId: 2,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'foo3',
      lastName: 'bar3',
      userName: 'foobar3',
      email: 'user@gmail.com',
      password: userPassword,
      gender: 'female',
      phoneNo: '+256785141480',
      profilePic: 'avatar.jpg',
      institutionId: 1,
      roleId: 3,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'user2',
      lastName: 'user2',
      userName: 'username3',
      email: 'user2@gmail.com',
      password: userPassword,
      gender: 'female',
      phoneNo: '+256785141480',
      profilePic: 'avatar.jpg',
      institutionId: 1,
      roleId: 3,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
