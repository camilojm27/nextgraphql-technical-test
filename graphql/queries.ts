import { gql } from '@apollo/client';

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

export const ADD_TRANSACTION_MUTATION = gql`
mutation Mutation($transaction: TransactionInput) {
  createTransaction(transaction: $transaction) {
    id
  }
}
`;

export const EDIT_USER_MUTATION = gql`
mutation EditUser($editUserId: ID!, $user: UserInput!) {
  editUser(id: $editUserId, user: $user) {
    role
    name
  }
}
`;
