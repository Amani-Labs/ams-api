import { gql } from 'apollo-server';

export const userMutation = gql`
  extend type  Mutation {
    addUser(input: UserInput!): User!
    updateUser(id: ID!, input: updateUserInput): User
    deleteUser(id: ID!): Boolean
    loginUser(email: String!, password: String!): Token
    sendResetPasswordEmail(email: String!): Message
    resetPassword(password: String!, confirmPassword: String!): Message
    verifyEmail(email: String!): Message!
  }
`;
