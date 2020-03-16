import assetsResolver from './asset.resolvers';
import { userResolver } from './user.resolver';
import { addressResolver } from './address.resolvers';
import { institutionResolver } from './institution.resolver';

const resolvers = [
  assetsResolver,
  userResolver,
  institutionResolver,
  addressResolver,
];

export default resolvers;
