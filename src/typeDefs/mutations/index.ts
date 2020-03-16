import { userMutation } from './user.mutations';
import { assetMutation } from './asset.mutations';
import { addressMutation } from './address.mutations';
import { institutionMutation } from './institution.mutations';

const allMutations = {
  userMutation,
  assetMutation,
  addressMutation,
  institutionMutation,
};

export default allMutations;
