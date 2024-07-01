import {PrismaAdapter} from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./lib/db"
import GitHub from "next-auth/providers/github"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  })],
  debug: true,
})