/**
 * Obtenemos los datos del servidor y los pasamos a la tabla de datos
 * Verificamos si el usuario tiene permisos para acceder a la página
 * 
 */
import { columns } from '@/components/users/columns';
import { DataTable } from '@/components/data-table';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gqlClient } from '@/graphql/client';
import { USERS_QUERY } from '@/graphql/queries';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/auth/acces-denied';


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await gqlClient.query({
      query: USERS_QUERY,
    });

    return {
      props: {
        users: data.users,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
      },
    };
  }
};

export default function Users({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { data: session, status } = useSession()


  {/*@ts-ignore*/}
  if (status === "unauthenticated" || session?.user.role !== 'ADMIN') {
    return <AccessDenied/>;
  }


  return (
    <div className="m-auto ">
      {/* <pre>{JSON.stringify(users)}</pre> */}
      <DataTable columns={columns} data={users} />
    </div>
  );
}
