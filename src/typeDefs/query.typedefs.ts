import { gql } from 'apollo-server';

export const query = gql`
  type Query {
    assets: [Asset]
  }
`;
