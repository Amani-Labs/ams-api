import assetsResolver from './asset.resolvers';
import { userResolver, createUserResolver } from './user.resolver';
import { storeResolver } from './store.resolvers';

const resolvers = [assetsResolver, userResolver, storeResolver, createUserResolver];

export default resolvers;
