import { Store } from '../sequelize/models/store.models';

export const storeResolver = {
  Query: {
    stores: () => Store.findAll(),
  },
};
