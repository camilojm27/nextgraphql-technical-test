import { ApolloClient, InMemoryCache } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: process.env.BASE_URL, // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});