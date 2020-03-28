import { query } from './query.typedefs';
import allMutations from './mutations';
import allQueries from './queries';
import { allTypes } from './types';


export const typeDefs = [
  query,
  allMutations.userMutation,
  allMutations.requestMutation,
  allMutations.assetMutation,
  allMutations.addressMutation,

  allQueries.addressQueries,
  allQueries.assetQueries,
  allQueries.requestQueries,

  allTypes.assetType,
  allTypes.institutionType,
  allTypes.userType,
  allTypes.roleType,
  allTypes.addressType,
  allTypes.requestType,
];
