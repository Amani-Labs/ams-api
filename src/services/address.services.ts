import { ApolloError } from 'apollo-server';
import { Address } from '../sequelize/models/address.models';
import { Iaddress } from '../interfaces/address.interfaces';
import Cache from '../config/redis';

export class AddressService {
  static async createAddress(args: Iaddress) {
    const { cell, village } = args;
    const [address, created] = await Address.findOrCreate({
      where: { cell, village },
      defaults: args,
    });
    if (created) {
      await Cache.deleteAllWithPattern('addresses');
      return { address };
    }
    throw new ApolloError('Address already exists! Please check your input and try again');
  }

  static async updateAddress(id: any, args: Iaddress) {
    const [_, [updatedAddress]] = await Address.update(args, {
      where: { id },
      returning: true,
    });

    await Cache.deleteAllWithPattern('addresses');
    return { updatedAddress };
  }

  static async getAllAddresses() {
    let addresses = await Cache.fetch('addresses');
    if (addresses) {
      return addresses;
    }
    addresses = await Address.findAll();
    if (addresses.length) {
      await Cache.save('addresses', addresses);
      return addresses;
    }
    throw new ApolloError('No addresses found at the moment. Please add one or come back later!');
  }

  static async getAddressById(id: any) {
    let address = await Cache.fetch(`address:${id}`);
    if (address) {
      return address;
    }
    address = await Address.findOne({ where: { id } });
    if (address) {
      await Cache.save(`address:${id}`, address);
      return address;
    }
    throw new ApolloError(`Address with the Id: ${id} not found!`);
  }

  static async deleteAddress(id: any) {
    const deletedAddress = await Address.destroy({ where: { id } });
    if (deletedAddress === 1) {
      await Cache.delete('addresses');
      return { message: `Address with id:${id} deleted successfully` };
    }
    throw new ApolloError(`Address with Id: ${id} not found.`);
  }
}
