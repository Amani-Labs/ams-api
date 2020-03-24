import assetsResolver from './asset.resolvers';
import { userResolver } from './user.resolver';
import { institutionResolver } from './institution.resolvers';

const resolvers = [assetsResolver, userResolver, institutionResolver];

export default resolvers;
