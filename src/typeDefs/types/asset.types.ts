import { gql } from 'apollo-server';

export const assetType = gql`
  enum AssetSource {
    bought
    donation
    other
  }

  enum UsageStatus {
    inuse
    instorage
    damagedstore
    disposed
  }
  
  enum HealthStatus {
    damaged
    repaired
    goodcondition
  }

  type Asset {
    serialNo: ID!
    institutionId: Int!
    assetTypeId: Int!
    name: String!
    description: String
    dateAcquired: String!
    source: AssetSource!
    donated: Boolean!
    warrantyEndDate: String!
    usageStatus: UsageStatus!
    healthStatus: HealthStatus!
    repairCost: Float
    recyclable: Boolean!
    assetImage: String
    assetCreatorId: Int!
  }
`;
