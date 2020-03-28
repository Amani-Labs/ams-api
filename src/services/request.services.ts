import { Request } from '../sequelize/models/requests.models';
import { User } from '../sequelize/models/user.models';
import { IrequestInput } from '../interfaces/request.interfaces';
import Redis from '../config/redis';

class RequestService {
  static async getAllRequests({ offset, limit }): Promise<Request[]> {
    let allRequests = await Redis.fetch(`allRequests:${offset}-${limit}`);
    if (allRequests) { return allRequests; }
    allRequests = await Request.findAll({ offset, limit });

    await Redis.save(`allRequests:${offset}-${limit}`, allRequests);

    return allRequests;
  }

  static async getRequestByID(id: number): Promise<Request | null> {
    let request = await Redis.fetch(`request:${id}`);

    if (request) { return request; }
    request = await Request.findOne({ where: { id } });
    if (request === null) { throw new Error(`Couldn’t find a request with ID: ${id}`); }
    await Redis.save(`request:${id}`, request);

    return request;
  }

  static async createRequest(request: IrequestInput, institutionId: number): Promise<Request> {
    // Get admins in current user institution
    const users = await User.findAll({
      where: { institutionId, roleId: 2 },
    });
    request.assignedAdmins = users;
    const createdRequest = await Request.create(request);
    await Redis.deleteAllWithPattern('allRequests');

    return createdRequest;
  }

  static async deleteRequest(id): Promise<boolean> {
    const targetRequest = await Request.findOne({ where: { id } });
    if (targetRequest === null) {
      throw new Error(`Couldn’t find request with ID: ${id}`);
    }
    await Redis.deleteAllWithPattern('allRequests');

    return !!await Request.destroy({ where: { id } });
  }

  static async updateRequest(id, request): Promise<Request> {
    const targetRequest = await Request.findOne({ where: { id } });
    if (targetRequest === null) {
      throw new Error(`Couldn’t find request with id: ${id}`);
    }
    const [_, updatedRequest] = await Request.update(request, {
      where: {
        id,
      },
      returning: true,
    });
    await Redis.deleteAllWithPattern('allRequests');

    return updatedRequest[_ - 1];
  }
}

export default RequestService;
