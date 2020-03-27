import assetsResolver from './asset.resolvers';
import { userResolver } from './user.resolver';
import { institutionResolver } from './institution.resolvers';
import { addressResolver } from './address.resolvers';

const resolvers = [
  assetsResolver,
  userResolver,
  institutionResolver,
  addressResolver,
];

export default resolvers;
