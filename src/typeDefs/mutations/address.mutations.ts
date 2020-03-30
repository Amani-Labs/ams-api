import { gql } from 'apollo-server';

export const addressMutation = gql`
  extend type Mutation {
    createAddress(
      province: String!
      district: String!
      sector: String!
      cell: String!
      village: String!
    ): Address
    
    updateAddress(
      id: ID!
      province: String
      district: String
      sector: String
      cell: String
      village: String
    ): Address
    
    deleteAddress(id: ID!): Message!
  } 
  `;
