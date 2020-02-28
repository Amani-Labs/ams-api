import { ApolloServer } from 'apollo-server';
import winston from 'winston';
import dotenv from 'dotenv';
import resolvers from './resolvers/index.resolvers';
import { typeDefs } from './typeDefs/index.typedefs';
import { logger } from './config/logging';

dotenv.config();
logger();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  winston.info(`🚀  Server ready at ${url}`);
});
