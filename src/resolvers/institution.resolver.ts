import { InstitutionService } from '../services/institution.services';
import { Iinstitution } from '../interfaces/institution.interfaces';
import { generalValidator } from '../middlewares/general.validator';
import { createInstitutionSchema, updateInstitutionSchema } from '../utils/schema.utils';
import { userGroup, checkUserRole } from '../utils/user.utils';
import { BaseResolver } from './base.resolvers';

export const institutionResolver = {
  Query: {
    institutions: async <T>(_: T, args: any, { token }): Promise<Iinstitution[]> => {
      await checkUserRole(token, userGroup.users);
      return InstitutionService.getAllInstitutions();
    },

    institution: async <T> (root: T, args: any, { token }): Promise<Iinstitution | null> => {
      await checkUserRole(token, userGroup.users);
      return InstitutionService.getInstitutionById(args.id);
    },
  },
  Mutation: {
    createInstitution: async <T> (_: T, args: Iinstitution, { token }) => BaseResolver.create(args, token, createInstitutionSchema, userGroup.superAdmin, { name: InstitutionService, method: 'createInstitution' }),

    updateInstitution: async <T> (_: T, args: any, { token }) => {
      await checkUserRole(token, userGroup.superAdmin);
      generalValidator(args, updateInstitutionSchema);
      const { id } = args;
      await InstitutionService.getInstitutionById(id);

      const [, [updatedData]] = await InstitutionService.updateInstitution(id, args);
      return updatedData;
    },

    deleteInstitution: async<T> (_: T, args: any, { token }) => BaseResolver.delete(args, token, userGroup.superAdmin, { name: InstitutionService, method: 'deleteInstitution' }),
  },
};
