import * as z from 'zod';
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(256),
});

export const RegisterSchema = z.object({
  name: z.string().min(3).max(256),
  email: z.string().email(),
  password: z.string().min(8).max(256),
});
