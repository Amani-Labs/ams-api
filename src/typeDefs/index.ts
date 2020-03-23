import { query } from './query.typedefs';
import allMutations from './mutations';
import { allTypes } from './types';


export const typeDefs = [
  query,
  allMutations.userMutation,
  allTypes.assetType,
  allTypes.storeType,
  allTypes.userType,
];
