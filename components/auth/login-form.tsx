import { CardWrapper } from './card-wrappper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';
import { FormError } from '../form-error';
import { FormSuccess } from '@/components/form-sucess';
import { useTransition } from 'react';

export const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {};

  return (
    <CardWrapper
      headerLabel='Sistema de ingresos y egresos'
      backButtonLabel='¿Deseas crear una cuenta?'
      backButtonHref='/auth/register'
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electronico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='hola@ejemplo.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='********' type='password' />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormError message='' />
          <FormSuccess message='' />
          <Button type='submit' className='w-full'>
            Iniciar Sesión
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
