import { gql } from 'apollo-server';

export const assetMutation = gql`
  type Mutation {
    addAsset(
      serialNo: ID!,
      institutionId: Int!,
      assetTypeId: Int!,
      name: String!,
      description: String,
      dateAcquired: String!,
      source: AssetSource!,
      donated: Boolean!,
      warrantyEndDate: String!,
      usageStatus: UsageStatus!,
      healthStatus: HealthStatus!,
      repairCost: Float,
      recyclable: Boolean,
      assetImage: String,
      assetCreatorId: Int!
    ): Asset!
    deleteAsset(serialNo: ID!): Boolean!
    updateAsset(
      serialNo: ID!,
      institutionId: Int,
      assetTypeId: Int,
      name: String,
      description: String,
      dateAcquired: String,
      source: AssetSource,
      donated: Boolean,
      warrantyEndDate: String,
      usageStatus: UsageStatus,
      healthStatus: HealthStatus,
      repairCost: Float,
      recyclable: Boolean,
      assetImage: String,
    ): Asset
  }
`;
