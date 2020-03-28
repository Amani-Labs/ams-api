import dotenv from 'dotenv';

dotenv.config();

const { SEEDER_SUPER_ADMIN_PASSWORD, SEEDER_ADMIN_PASSWORD, SEEDER_USER_PASSWORD } = process.env;

export const newAddress = {
  province: 'Coast',
  district: 'Malindi',
  sector: 'Mtangani',
  cell: 'Palm Tree',
  village: 'RedCross RD',
};

export const newRequest = {
  input: {
    requestType: 'donation',
    assetTypeId: 1,
    numberOfItems: 5,
    requestedTo: 1,
    reason: 'we need syringes',
    adminComment: 'sure',
  },
};

export const args1 = {
  email: 'foobar@gmail.com',
  password: SEEDER_SUPER_ADMIN_PASSWORD || '',
};

export const args2 = {
  email: 'foobar1@gmail.com',
  password: SEEDER_ADMIN_PASSWORD || '',
};

export const userCredentials = {
  email: 'user2@gmail.com',
  password: SEEDER_USER_PASSWORD || '',
};

export const updateAddressArgs = {
  id: '2',
  district: 'Malindi',
};
