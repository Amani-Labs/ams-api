import { gql } from 'apollo-server';

export const assetQueries = gql`
  extend type Query {
    allAssets(offset: Int, limit: Int): [Asset!]!,
    asset(serialNo: ID!): Asset
  }
`;
