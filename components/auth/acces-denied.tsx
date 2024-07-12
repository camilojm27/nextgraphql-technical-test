import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AccessDenied = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-[350px] shadow-lg'>
        <CardHeader className='text-center'>
          <div className='mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4'>
            <Shield className='w-8 h-8 text-red-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-red-500'>
            Acceso denegado
          </CardTitle>
          <CardDescription>
            No tienes permiso para ver esta página.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600'>
            Si crees que esto es un error, por favor contacta al administrador.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center space-x-4'>
          <Button variant='outline' onClick={() => window.history.back()}>
            Regresar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccessDenied;
