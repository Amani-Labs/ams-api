import { gql } from 'apollo-server';

export const userType = gql`
enum Gender {
    male
    female
    trans
}

type User {
    id: ID
    roleId: ID!
    firstName: String!
    lastName: String!
    userName: String!
    gender: Gender
    phoneNo: String
    email: String!
    profilePic: String
    password: String!
    institutionId: ID!
    token: String
    userRole: Role!
    institution: Institution!
}
input UserInput {
    roleId: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
    gender: Gender!
    phoneNo: String,
    institutionId: ID!
  }
  input updateUserInput {
    roleId: String
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    gender: Gender
    phoneNo: String,
    institutionId: ID
  }
  type Token {
    token: String
}
type Message {
        message: String
    }
`;
