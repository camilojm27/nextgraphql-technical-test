import { gql } from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
  query Query {
    transactions {
      id
      amount
      description
      userId
      createdAt
      updatedAt
      user {
        name
        email
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query Query {
    users {
      id
      name
      email
      telephone
      role
    }
  }
`;
