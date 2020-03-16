import { AddressService } from '../services/address.services';
import { Iaddress } from '../interfaces/address.interfaces';
import { generalValidator } from '../middlewares/general.validator';
import {
  createAddressSchema,
  updateAddressSchema,
} from '../utils/schema.utils';
import { userGroup, checkUserRole } from '../utils/user.utils';
import { BaseResolver } from './base.resolvers';

export const addressResolver = {
  Query: {
    addresses: async <T>(_: T, args, { token }) => {
      await checkUserRole(token, userGroup.users);
      return AddressService.getAllAddresses();
    },

    address: async <T>(root: T, args: any, { token }) => {
      await checkUserRole(token, userGroup.users);
      const address = AddressService.getAddressById(args.id);
      return address;
    },
  },
  Mutation: {
    createAddress: async <T>(_: T, args: Iaddress, { token }) => BaseResolver.create(args, token, createAddressSchema, userGroup.superAdmin, { name: AddressService, method: 'createAddress' }),

    updateAddress: async <T>(_: T, args: any, { token }) => {
      await checkUserRole(token, userGroup.superAdmin);
      generalValidator(args, updateAddressSchema);
      const { id } = args;
      await AddressService.getAddressById(id);
      const { updatedAddress } = await AddressService.updateAddress(id, args);
      return updatedAddress;
    },

    deleteAddress: async <T>(_: T, args: any, { token }) => BaseResolver.delete(args, token, userGroup.superAdmin, { name: AddressService, method: 'deleteAddress' }),
  },
};
