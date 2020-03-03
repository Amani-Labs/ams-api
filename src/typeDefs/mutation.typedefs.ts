import { gql } from 'apollo-server';

export const mutation = gql`
  type Mutation {
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!, avatar: String! ): User
  }
`;
