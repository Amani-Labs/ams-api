import { gql } from 'apollo-server';

export const storeType = gql`
    type Store{
        id: ID!
        name: String!
        address: String!
    }
`;
