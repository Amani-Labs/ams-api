import { gql } from 'apollo-server';

export const roleQueries = gql`
  extend type Query {
    role(id: ID!): Role!
  }
`;
