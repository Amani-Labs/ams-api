import { gql } from 'apollo-server';

export const institutionType = gql`
 enum instType {
    health,
    educational,
    insuarance,
    others
  }
  scalar JSON
 type Institution {
        id: ID!
        name: String!
        type: instType!
        address: JSON!
  }
`;
