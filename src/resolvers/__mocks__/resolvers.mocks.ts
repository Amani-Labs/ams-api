import dotenv from 'dotenv';

dotenv.config();

const { SEEDER_SUPER_ADMIN_PASSWORD, SEEDER_ADMIN_PASSWORD } = process.env;

export const newAddress = {
  province: 'Coast',
  district: 'Malindi',
  sector: 'Mtangani',
  cell: 'Palm Tree',
  village: 'RedCross RD',
};

export const args1 = {
  email: 'foobar@gmail.com',
  password: SEEDER_SUPER_ADMIN_PASSWORD || '',
};

export const newInstitution = {
  name: 'Malindi sub-county',
  type: 'others',
  addressId: 1,
};

export const updateInstitutionArgs = {
  id: '2',
  name: 'Malindi sub-County- Kilifi',
};

export const args2 = {
  email: 'foobar1@gmail.com',
  password: SEEDER_ADMIN_PASSWORD || '',
};

export const updateAddressArgs = {
  id: '2',
  district: 'Malindi',
};
