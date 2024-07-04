import { ApolloClient, InMemoryCache } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});