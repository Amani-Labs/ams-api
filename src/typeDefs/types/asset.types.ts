import { gql } from 'apollo-server';

export const assetType = gql`
  # This "Asset" type defines the queryable fields for every asset in our data source.
  type Asset {
    serialNo: ID!
    name: String!
    description: String!
    usageStatus: Boolean
  }
`;
