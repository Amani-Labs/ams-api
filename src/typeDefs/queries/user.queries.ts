import { gql } from 'apollo-server';

export const userQueries = gql`
  type Query {
    users(offset: Int, limit: Int): [User!]!
    user(id: ID!): User!
  }
`;
