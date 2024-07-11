import prisma from '@/prisma/db';

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

const getUserById = async (id: string) => {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch {
      return null;
    }
  };
