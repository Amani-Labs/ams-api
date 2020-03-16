import { gql } from 'apollo-server';

export const institutionMutation = gql`
  extend type Mutation {
    createInstitution(
      name: String!
      type: instType!
      addressId: Int!
    ): Institution

    updateInstitution(
      id: ID!
      name: String
      type: instType
      addressId: Int
    ): Institution
    
    deleteInstitution(id: ID!): Message!
  } 
  `;
