import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
  }

  type User {
    id: ID!
    name: String
    email: String
    emailVerified: String
    image: String
    telephone: String
    role: String
    transactions: [Transaction!]!
    createdAt: String
    updatedAt: String
  }

  type Transaction {
    id: ID!
    amount: Int!
    description: String
    userId: ID!
    user: User
    transactionDate: String

    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createTransaction(transaction: TransactionInput): Transaction
    editUser(id: ID!, user: UserInput!): User
  }

  input TransactionInput {
    amount: Int!
    description: String
    userId: ID!
    transactionDate: String
  }

  input UserInput {
    name: String
    email: String
    image: String
    telephone: String
    role: String
  }
`;
