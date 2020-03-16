import { ApolloError } from 'apollo-server';
import { Address } from '../sequelize/models/address.models';
import { Iaddress } from '../interfaces/address.interfaces';
import Cache from '../config/redis';
import { BaseService } from './base.services';

export class AddressService {
  static createAddress = (args: Iaddress) => BaseService.create(args, ['cell', 'village'], { class: Address, method: 'findOrCreate' });

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

  static getAddressById = (id: any) => BaseService.findById(id, { class: Address, method: 'findOne' });

  static deleteAddress = (id: any) => BaseService.delete(id, { class: Address, method: 'destroy' });
}
