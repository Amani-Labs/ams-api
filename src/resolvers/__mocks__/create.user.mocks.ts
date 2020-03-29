import 'dotenv/config';


const {
  SEEDER_SUPER_ADMIN_PASSWORD, SEEDER_ADMIN_PASSWORD, SEEDER_USER_PASSWORD,
} = process.env;

export const argsSuperadmin = { email: 'foobar@gmail.com', password: SEEDER_SUPER_ADMIN_PASSWORD || '' };
export const admin = { email: 'foobar1@gmail.com', password: SEEDER_ADMIN_PASSWORD || '' };
export const userCredentials = { email: 'user2@gmail.com', password: SEEDER_USER_PASSWORD || '' };
export const unVerifiedUser = { email: 'user@gmail.com', password: 'ASqw12345' };

export const userInput = {
  firstName: 'newSuperAdmin',
  lastName: 'userlastName',
  userName: 'useruserName',
  email: 'newsuperadmin@gmail.com',
  password: 'password',
  phoneNo: '12334566666',
  gender: 'male',
  roleId: 1,
  institutionId: 1,
};

export const existingUserNameInput = {
  firstName: 'newSuperAdmin',
  lastName: 'userlastName',
  userName: 'useruserName',
  email: 'newsuperadmintwo@gmail.com',
  password: 'password',
  phoneNo: '12334566666',
  gender: 'male',
  roleId: 1,
  institutionId: 1,
};

export const existingUserEmailInput = {
  firstName: 'newSuperAdmin',
  lastName: 'userlastName',
  userName: 'useruserNametwo',
  email: 'newsuperadmin@gmail.com',
  password: 'password',
  phoneNo: '12334566666',
  gender: 'male',
  roleId: 1,
  institutionId: 1,
};


export const superAdminInput = {
  firstName: 'newSuperAdmin',
  lastName: 'userlastName',
  userName: 'anotheruser',
  email: 'anothersuperadmin@gmail.com',
  password: 'password',
  phoneNo: '12334566666',
  gender: 'male',
  roleId: 1,
  institutionId: 1,
};

export const updateSuperAdminInput = {
  firstName: 'updatedFirstName',
  lastName: 'userlastName',
  userName: 'useruserName',
  email: 'updatedemail@gmail.com',
  password: 'password',
  phoneNo: '12334566666',
  gender: 'male',
  roleId: 1,
  institutionId: 1,
};
