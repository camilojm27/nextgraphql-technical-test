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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditUserSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { ApolloClient, gql, useMutation } from '@apollo/client';
import { gqlClient } from '@/graphql/client';

type EditProfileProps = {
  name: string;
  role: 'USER' | 'ADMIN';
  onSave?: (user: any) => void;
};

const EDIT_USER_MUTATION = gql`
  mutation EditUser($editUserId: ID!, $user: UserInput!) {
    editUser(id: $editUserId, user: $user) {
      role
      name
    }
  }
`;

export default function EditProfile({ name, role, onSave }: EditProfileProps) {
    const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: name,
      role: role,
    },
  });

  const [addTransaction] = useMutation(EDIT_USER_MUTATION, {
    client: gqlClient,
  });

  const sendForm = async (values: z.infer<typeof EditUserSchema>) => {
    console.log('values:', values);
    try {
      const response = await addTransaction({
        variables: {
          editUserId: 'cly6hw85r0001w5nbjdcajjt4', //TODO: Change this to the actual user id
          user: {
            role: values.role,
            name: values.name,
          },
        },
      });
      console.log('Transaction added:', response.data);
      onSave?.(response.data.editUser);
      setOpen(false);
    } catch (error: any) {
      console.error('Error adding transaction:', error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Editar Usuario</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Inserte los campos que desea modificar
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendForm)} className=''>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='m-3'>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='m-3'>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className=''>
                      <SelectValue placeholder={role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='USER'>Usuario Regular</SelectItem>
                      <SelectItem value='ADMIN'>Administrador</SelectItem>
                    </SelectContent>
                  </Select>
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
