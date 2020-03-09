import { gql } from 'apollo-server';

export const assetType = gql`
  # This "Asset" type defines the queryable fields for every asset in our data source.
  type Asset {
    id: ID!
    name: String!
    code: ID!
    description: String!
    state: String!
    recyclable: Boolean!
    storeId: ID!
  }
`;
