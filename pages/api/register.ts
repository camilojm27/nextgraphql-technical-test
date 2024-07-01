import { RegisterSchema } from '@/schemas';
import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';

import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getUserByEmail } from '@/prisma/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let result;

  try {
    const { name, email, password } = RegisterSchema.parse(req.body);
    console.table(req)
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await argon2.hash(password);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: 'User registered successfully', user: result });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ errors: e.errors });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

