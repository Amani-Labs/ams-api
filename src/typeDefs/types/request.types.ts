import { gql } from 'apollo-server';

export const requestType = gql`
  enum RequestType {
    repair
    donation
    disposal
    recycling
    other
  }

  enum RequestedItemStatus {
    pending
    inprocess
    approved
    declined
  }

  type Request {
    id: ID!
    requestType: RequestType!
    assetTypeId: Int!
    assignedAdmins: [User!]
    status: RequestedItemStatus!
    numberOfItems: Int!
    requesterId: Int!
    approvedBy: Int
    requestedTo: Int!
    reason: String
    adminComment: String
    superAdminComment: String
  }

  input RequestInput {
    requestType: RequestType!
    assetTypeId: Int!
    numberOfItems: Int!
    requestedTo: Int!
    reason: String
    adminComment: String
    superAdminComment: String
  }
  input RequestUpdateInput {
    requestType: RequestType
    assetTypeId: Int
    numberOfItems: Int
    requestedTo: Int
    reason: String
    adminComment: String
    superAdminComment: String
  }
`;
