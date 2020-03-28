import { gql } from 'apollo-server';

export const requestMutation = gql`
  extend type Mutation {
    createRequest(input: RequestInput!): Request!
    updateRequest(id: ID!, request: RequestUpdateInput!): Request!
    deleteRequest(id: ID!): Boolean!
  }
`;
