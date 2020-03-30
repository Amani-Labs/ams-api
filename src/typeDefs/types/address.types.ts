import { gql } from 'apollo-server';

export const addressType = gql`
  type Address {
    id: ID!
    province: String!
    district: String!
    sector: String!
    cell: String!
    village: String!
  }
`;
