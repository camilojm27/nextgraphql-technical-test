import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Se implemento inicialmente el registro de usuarios, pero se cambio a la autenticación con next-auth
 * ya que el provedor auth0 permite el registro de usuarios
 * 
 */


// import { RegisterSchema } from '@/schemas';
// import argon2 from 'argon2';
// import { z } from 'zod';
// import prisma from '@/prisma/db';
// import { getUserByEmail } from '@/prisma/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }



  // let result;

  // try {
  //   const { name, email, password, telephone } = RegisterSchema.parse(req.body);
  //   console.table(req)
  //   const existingUser = await getUserByEmail(email);

  //   if (existingUser) {
  //     return res.status(400).json({ message: 'User already exists' });
  //   }

  //   const hashedPassword = await argon2.hash(password);

  //   await prisma.user.create({
  //     data: {
  //       name: name,
  //       email: email,
  //       telephone: telephone,
  //       password: hashedPassword,
  //     },
  //   });

  //   res
  //     .status(201)
  //     .json({ message: 'User registered successfully', user: result });
  // } catch (e: any) {
  //   if (e instanceof z.ZodError) {
  //     return res.status(400).json({ errors: e.errors });
  //   }
  //   console.log(e.message);
  //   return res.status(500).json({ message: e.message });
  // }
}

