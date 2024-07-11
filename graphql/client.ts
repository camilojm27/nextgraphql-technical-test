import { ApolloClient, InMemoryCache } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BASE_URL + '/api/graphql',
  cache: new InMemoryCache(),
});