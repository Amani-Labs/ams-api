import { gql } from 'apollo-server';

export const userMutation = gql`
  extend type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
      avatar: String!
    ): User
    loginUser(email: String!, password: String!): Token
    sendResetPasswordEmail(email: String!): Message
    resetPassword(password: String!, confirmPassword: String!): Message
  }
`;
