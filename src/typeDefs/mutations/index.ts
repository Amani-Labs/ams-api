import { userMutation } from './user.mutations';
import { assetMutation } from './asset.mutations';
import { addressMutation } from './address.mutations';
import { requestMutation } from './request.mutations';

const allMutations = {
  userMutation,
  assetMutation,
  addressMutation,
  requestMutation,
};

export default allMutations;
