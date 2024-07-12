import prisma from '@/prisma/db';
/*

Se implemento inicialmente el registro de usuarios, pero se cambio a la autenticación con next-auth
ya que el provedor auth0 permite el registro de usuarios
*/
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
