import { gql } from 'apollo-server';

export const addressQueries = gql`
  extend type Query {
    addresses: [Address!]!
    address(id: Int): Address!
  }
`;
