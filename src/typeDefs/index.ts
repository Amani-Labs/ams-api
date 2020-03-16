import allMutations from './mutations';
import allQueries from './queries';
import { allTypes } from './types';


export const typeDefs = [
  allMutations.userMutation,
  allMutations.assetMutation,
  allMutations.addressMutation,
  allMutations.institutionMutation,
  allQueries.addressQueries,
  allQueries.assetQueries,
  allQueries.roleQueries,
  allQueries.userQueries,
  allQueries.institutionQueries,
  allTypes.assetType,
  allTypes.institutionType,
  allTypes.userType,
  allTypes.roleType,
  allTypes.addressType,
];
