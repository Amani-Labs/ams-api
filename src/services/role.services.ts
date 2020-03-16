import { Role } from '../sequelize/models/role.models';
import { BaseService } from './base.services';

export class RoleService {
  static getRoleById = (id: any) => BaseService.findById(id, { class: Role, method: 'findOne' });
}
