import { Institution } from '../sequelize/models/institution.models';

export const institutionResolver = {
  Query: {
    institutions: () => Institution.findAll(),
    institution: (_, args) => args,
  },
};
