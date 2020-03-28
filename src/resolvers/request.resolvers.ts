import { RequestService } from '../services';
import { generalValidator } from '../middlewares/general.validator';
import { requestInputSchema } from '../utils/schema.utils';
import { decodeToken } from '../utils/user.utils';

const requestResolver = {
  Query: {
    allRequests: async (_, { offset = 0, limit = 20 }) => {
      const allRequests = await RequestService.getAllRequests({ offset, limit });
      return allRequests;
    },
    request: async (_, { id }) => RequestService.getRequestByID(id),
  },
  Mutation: {
    createRequest: async (_, { input }, { token }) => {
      const copyRequestInput = { ...input };
      const { id: userId, institutionId } = await decodeToken(token);
      generalValidator(copyRequestInput, requestInputSchema);
      copyRequestInput.requesterId = userId;
      const newRequest = await RequestService.createRequest(copyRequestInput, institutionId);
      return newRequest;
    },
    updateRequest: async (_, { id, request }) => {
      const updatedRequest = await RequestService.updateRequest(id, request);
      return updatedRequest;
    },
    deleteRequest: async (_, { id }) => RequestService.deleteRequest(id),
  },
};

export default requestResolver;
