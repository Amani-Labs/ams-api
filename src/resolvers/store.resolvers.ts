import { Institution } from '../sequelize/models/institution.models';

export const storeResolver = {
  Query: {
    stores: () => Institution.findAll(),
  },
};
