import { generalValidator } from '../middlewares/general.validator';
import { checkUserRole } from '../utils/user.utils';

export class BaseResolver {
  static async create(
    args: any,
    token: string,
    schema: any,
    userGroup: any,
    service: { name: any; method: string },
  ) {
    await checkUserRole(token, userGroup);
    generalValidator(args, schema);
    const { data } = await service.name[service.method](args);
    return data;
  }

  static async delete(
    args: any,
    token: string,
    userGroup: any,
    service: { name: any; method: string },
  ) {
    await checkUserRole(token, userGroup);
    return service.name[service.method](args.id);
  }
}
