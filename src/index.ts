import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import resolvers from './resolvers';
import { typeDefs } from './typeDefs';
import { logger } from './config/logging';
import './config/connectDb';


dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization,
  }),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
