/* eslint-disable no-console */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';
import connectDB from './db/index';
import env from './environment'; 

const startServer = async () => {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: env.serverPort },
    });

    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
