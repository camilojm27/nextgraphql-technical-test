import * as z from 'zod';
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(256),
});

export const RegisterSchema = z.object({
  name: z.string().min(3).max(256),
  email: z.string().email(),
  telephone: z.string().min(10).max(15),
  password: z.string().min(8).max(256),
});

export const EditUserSchema = z.object({
  name: z.string().min(3).max(256),
  role:  z.union([z.literal('ADMIN'), z.literal('USER')]),
});


export const TransactionSchema = z.object({
  amount: z.coerce.number(),
  description: z.string().max(5000, { message: 'La descripción debe ser menos a 5000 caracteres' }),
  date: z.coerce.date().max(new Date(), { message: 'La fecha no puede ser mayor a la fecha actual' }),
});

