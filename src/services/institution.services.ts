import { ApolloError } from 'apollo-server';
import { Institution } from '../sequelize/models/institution.models';
import { Iinstitution } from '../interfaces/institution.interfaces';
import { Address } from '../sequelize/models/address.models';
import Cache from '../config/redis';
import { BaseService } from './base.services';

export class InstitutionService {
  static async getAllInstitutions(): Promise<Institution []> {
    let institutions = await Cache.fetch('institutions');
    if (institutions) {
      return institutions;
    }
    institutions = await Institution.findAll({
      include: [{
        model: Address,
        as: 'address',
      }],
    });
    if (institutions.length) {
      await Cache.save('institutions', institutions);
      return institutions;
    }
    throw new ApolloError('No Institutions found at the moment. Please add one or come back later!');
  }

  static async getInstitutionById(id: any): Promise<Institution | null > {
    let institution = await Cache.fetch(`institution:${id}`);
    if (institution) {
      return institution;
    }
    institution = await Institution.findOne({
      where: { id },
      include: [{
        model: Address,
        as: 'address',
      }],
    });
    if (institution) {
      await Cache.save(`institution:${id}`, institution);
      return institution;
    }
    throw new ApolloError(`Institution with Id:${id} not found!`);
  }

  static createInstitution = (args: Iinstitution) => BaseService.create(args, ['name', 'addressId'], { class: Institution, method: 'findOrCreate' });

  static async updateInstitution(id: any, args: Iinstitution) {
    const updatedInstitution = await Institution.update(args, { where: { id }, returning: true });
    await Cache.deleteAllWithPattern('institutions');
    return updatedInstitution;
  }

  static deleteInstitution = (id: any) => BaseService.delete(id, { class: Institution, method: 'destroy' });
}
