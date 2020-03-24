import { gql } from 'apollo-server';

export const query = gql`
  type Query {
    users(offset: Int, limit: Int): [User!]!
    institutions: [Institution!]!
    user(id: ID!): User!
    role(id: ID!): Role!
    institution(id: ID!): Institution
  }
`;
