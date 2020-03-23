import assetsResolver from './asset.resolvers';
import { userResolver } from './user.resolver';
import { storeResolver } from './store.resolvers';

const resolvers = [
  assetsResolver,
  userResolver,
  storeResolver,
];

export default resolvers;
