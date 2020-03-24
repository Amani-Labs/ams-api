import { gql } from 'apollo-server';

export const institutionType = gql`
    enum Type {
        health
        educational
        other
    }
    type Institution{
        id: ID!
        name: String!
        type: Type!
        addressId: ID!
        users: [User]!
    }
`;
