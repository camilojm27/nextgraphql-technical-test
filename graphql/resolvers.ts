import prisma from '@/prisma/db';

export const resolvers = {
  Query: {
    users() {
      return prisma.user.findMany({ include: { transactions: true } });
    },
    transactions() {
      return prisma.transaction.findMany({ include: { user: true } });
    },
  },
  Mutation: {
    createTransaction(_: any, { transaction }: any) {
      console.log(transaction);
      return prisma.transaction.create({ data: transaction });
    },
    editUser(_: any, { id, user }: any) {
      return prisma.user.update({ where: { id }, data: user });
    },
  },
};