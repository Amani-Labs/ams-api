import assetsResolver from './asset.resolvers';
import { userResolver } from './user.resolver';
import { institutionResolver } from './institution.resolvers';
import { addressResolver } from './address.resolvers';
import requestResolvers from './request.resolvers';

const resolvers = [
  assetsResolver,
  userResolver,
  institutionResolver,
  addressResolver,
  requestResolvers,
];

export default resolvers;
