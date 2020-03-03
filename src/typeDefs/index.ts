import { query } from './query.typedefs';
import { mutation } from './mutation.typedefs';
import { allTypes } from './types';


export const typeDefs = [
  query,
  mutation,
  allTypes.assetType,
  allTypes.storeType,
  allTypes.userType,
];
