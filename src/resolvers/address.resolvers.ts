import { AddressService } from '../services/address.services';
import { Iaddress } from '../interfaces/address.interfaces';
import { generalValidator } from '../middlewares/general.validator';
import { createAddressSchema, updateAddressSchema } from '../utils/schema.utils';
import { userGroup, checkUserRole } from '../utils/user.utils';

export const addressResolver = {
  Query: {
    addresses: async <T> (_: T, args, { token }) => {
      await checkUserRole(token, userGroup.users);
      return AddressService.getAllAddresses();
    },

    address: async <T> (root: T, args: any, { token }) => {
      await checkUserRole(token, userGroup.users);
      const address = AddressService.getAddressById(args.id);
      return address;
    },
  },
  Mutation: {
    createAddress: async <T> (_: T, args: Iaddress, { token }) => {
      await checkUserRole(token, userGroup.superAdmin);
      generalValidator(args, createAddressSchema);
      const { address } = await AddressService.createAddress(args);
      return address;
    },

    updateAddress: async <T> (_: T, args: any, { token }) => {
      await checkUserRole(token, userGroup.superAdmin);
      generalValidator(args, updateAddressSchema);
      const { id } = args;
      await AddressService.getAddressById(id);
      const { updatedAddress } = await AddressService.updateAddress(id, args);
      return updatedAddress;
    },

    deleteAddress: async <T> (_: T, args: any, { token }) => {
      await checkUserRole(token, userGroup.superAdmin);
      return AddressService.deleteAddress(args.id);
    },
  },
};
