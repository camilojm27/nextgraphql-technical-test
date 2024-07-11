import { ApolloClient, InMemoryCache } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});