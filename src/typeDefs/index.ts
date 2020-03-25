import { query } from './query.typedefs';
import allMutations from './mutations';
import allQueries from './queries';
import { allTypes } from './types';


export const typeDefs = [
  query,
  allMutations.userMutation,
  allMutations.assetMutation,
  allQueries.assetQueries,
  allTypes.assetType,
  allTypes.storeType,
  allTypes.userType,
];
