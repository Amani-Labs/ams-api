import { gql } from 'apollo-server';

export const requestQueries = gql`
  extend type Query {
    allRequests(offset: Int, limit: Int): [Request!]!,
    request(id: ID!): Request
  }
`;
