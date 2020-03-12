import { gql } from 'apollo-server';

export const userType = gql`
type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
    profilePic: String
}

type Token {
    token: String
}
`;
