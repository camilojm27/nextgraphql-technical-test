/*
  Se crea el servidor de graphql, se separan los schemas y resolvers en archivos diferentes
*/
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';


export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
