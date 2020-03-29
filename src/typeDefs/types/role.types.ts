import { gql } from 'apollo-server';

export const roleType = gql`
    type Role {
        id: ID!
        name: String!
        description: String!
        users: [User]!
    }
`;
