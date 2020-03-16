import { gql } from 'apollo-server';

export const institutionQueries = gql`
  extend type Query {
    institutions: [Institution!]!
    institution(id: ID!): Institution!
  }
`;
