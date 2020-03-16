import { ApolloError } from 'apollo-server';
import Cache from '../config/redis';


export class BaseService {
  static async create(args: any, names: string[], model: { class: any; method: string }) {
    const prop1 = args[names[0]];
    const prop2 = args[names[1]];
    const methodName = String(this.getMethodName(model));

    const where = {};
    where[names[0]] = prop1;
    where[names[1]] = prop2;

    const [data, created] = await model.class[model.method]({
      where,
      defaults: args,
    });
    if (created) {
      await Cache.deleteAllWithPattern(methodName);
      return { data };
    }
    throw new ApolloError(`${methodName} already exists! Please check your input and try again`);
  }

  static async delete(id: any, model: { class: any; method: string }) {
    const methodName = String(this.getMethodName(model));
    const deletedEntity = await model.class[model.method]({ where: { id } });
    if (deletedEntity === 1) {
      await Cache.deleteAllWithPattern(methodName);
      return { message: `${methodName} with id:${id} deleted successfully` };
    }
    throw new ApolloError(`${methodName} with Id: ${id} not found.`);
  }

  static async findById(id: any, model: { class: any; method: string }) {
    const methodName = String(this.getMethodName(model));
    let data = await Cache.fetch(`${methodName}:${id}`);
    if (data) {
      return data;
    }
    data = await model.class[model.method]({ where: { id } });
    if (data) {
      await Cache.save(`${methodName}:${id}`, data);
      return data;
    }
    throw new ApolloError(`${methodName} with the Id: ${id} not found!`);
  }

  // Method to extract method name and capitalize the first letter.
  static getMethodName = (model: any) => {
    const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1);

    let methodname = model.class.prototype.constructor.name;
    methodname = capitalize(methodname);
    return methodname;
  };
}
