import { gql } from 'apollo-server';

export const userMutation = gql`
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
      avatar: String!
    ): User
    loginUser(email: String!, password: String!): Token
  }
`;
