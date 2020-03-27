import { query } from './query.typedefs';
import allMutations from './mutations';
import allQueries from './queries';
import { allTypes } from './types';


export const typeDefs = [
  query,
  allMutations.userMutation,
  allMutations.assetMutation,
  allMutations.addressMutation,
  allQueries.addressQueries,
  allQueries.assetQueries,
  allTypes.assetType,
  allTypes.institutionType,
  allTypes.userType,
  allTypes.roleType,
  allTypes.addressType,
];
