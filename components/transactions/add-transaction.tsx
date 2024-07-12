import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TransactionSchema } from '@/types/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { gql, useMutation } from '@apollo/client';
import { gqlClient } from '@/graphql/client';
import { ADD_TRANSACTION_MUTATION } from '@/graphql/queries';


export default function AddTransaction({
  onTransactionAdded,
  userID,
}: {
  onTransactionAdded: () => void;
  userID: string;
}) {
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
      description: '',
    },
  });

  const [addTransaction] = useMutation(ADD_TRANSACTION_MUTATION, {
    client: gqlClient,
  });

  const sendForm = async (values: z.infer<typeof TransactionSchema>) => {
    try {
      const response = await addTransaction({
        variables: {
          transaction: {
            amount: values.amount,
            description: values.description,
            userId: userID,
            transactionDate: values.date,
          },
        },
      });
      console.log('Transaction added:', response.data.addTransaction);
      onTransactionAdded();
    } catch (error: any) {
      console.error('Error adding transaction:', error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Nueva transacción</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Inserte los datos de la transacción
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendForm)}>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    {/*@ts-ignore*/}
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' className='mx-auto my-2'>
                Ingresar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
