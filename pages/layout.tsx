import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useSession, signOut, signIn} from "next-auth/react"


export default function Layout({ children }:  { children: React.ReactNode }) {
  const { data, status } = useSession()
  

  return (
    <main className='flex min-h-screen w-full flex-col'>


      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <nav
          className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row justify-evenly md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link
            href='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <Package2Icon className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Link
            href='/'
            className='text-muted-foreground transition-colors hover:text-foreground'
          >
            Inicio
          </Link>
          {status === "authenticated" && (
            <Link
              href='transactions'
              className='text-muted-foreground transition-colors hover:text-foreground'
            >
              Transaciones
            </Link>
          )}
          {/*@ts-ignore*/}
          {status === "authenticated" && data?.user.role === "ADMIN" &&(
            <>
              <Link
                href='users'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                Usuarios
              </Link>
              <Link
                href='dashboard'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                Reportes
              </Link>
            </>

          )}

          {status === "authenticated" ? (
            <Button onClick={()=> signOut({
              callbackUrl: '/'
            })}>
              Cerrar sesion
            </Button>)

            :
            <Button onClick={()=> signIn('auth0', {
            })}>
              Iniciar Sesion
            </Button>
          }

        </nav>
      </header>
      {children}
    </main>
  );
}


function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z' />
      <path d='m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9' />
      <path d='M12 3v6' />
    </svg>
  );
}
