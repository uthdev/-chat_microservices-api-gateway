import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
// import { buildSchema } from 'type-graphql';

import schema from '#root/graphql/schema';
import resolvers from '#root/graphql/resolvers';

import formatGraphQLErrors from './formatGraphQLErrors';
import injectSession from './middleware/injectSession';

const PORT = config.get<number>("PORT");

const startServer = async () => {
  // const schema = await buildSchema({
  //   resolvers: [],
  //   emitSchemaFile: true,
  //   validate: false
  // });

  const apolloServer = new ApolloServer({
    context: a => a,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    formatError: formatGraphQLErrors,
    typeDefs: schema,
    
  })

  const app = express();

  app.use(cookieParser());

  app.use(cors({
    credentials: true,
    origin: (origin, cb) => cb(null, true)
  }));

  app.use(injectSession)

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: false, path: '/graphql'  });
  

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`API gateway listening on ${PORT}`);
    
  })
}

export default startServer;