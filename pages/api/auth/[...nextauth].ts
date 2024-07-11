import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/db';
import Auth0 from 'next-auth/providers/auth0';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0({
      // profile(profile) {
      //   console.table(profile)
      //   return{
      //     ...profile,
      //     role: 'USER',
      //     image: profile.picture,
      //     id: profile.sub ?? '',
      //   }
      // },
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      id: 'auth0',
    })

  ],
  callbacks: {
    // async signIn({ user }: { user: any }) {

    //   const usersCount = await prisma.user.count();

    //   // If it's the first user, set the role to 'admin'
    //   if (usersCount === 0) {
    //     await prisma.user.create({
    //       data: { role: 'ADMIN', name: user.name, email: user.email, image: user.image},
    //     });
    //   }
    //   return true;
    // },
    session({ session, user }: { session: any, user: any }) {
      session.user.role = user.role
      session.user.id = user.id
      return session
    }
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: true,
  secret: process.env.AUTH_SECRET,
};
//@ts-ignore
export default NextAuth(authOptions);
