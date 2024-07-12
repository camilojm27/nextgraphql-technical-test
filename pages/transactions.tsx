/**
 * Obtenemos los datos del servidor y los pasamos a la tabla de datos
 * Verificamos si el usuario tiene permisos para acceder a la página
 * 
 * En caso de que el usuario agrege una nueva transacción, se refresca la tabla
 */
import { useQuery } from '@apollo/client';
import { columns } from '@/components/transactions/columns';
import { DataTable } from '@/components/transactions/data-table';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AddTransaction from '@/components/transactions/add-transaction';
import { gqlClient } from '@/graphql/client';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/auth/acces-denied';
import { TRANSACTIONS_QUERY } from '@/graphql/queries';


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await gqlClient.query({
      query: TRANSACTIONS_QUERY,
    });

    return {
      props: {
        initialTransactions: data.transactions,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialTransactions: [],
      },
    };
  }
};

export default function Transactions({
  initialTransactions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (typeof window === "undefined") return null

  const { data: session, status } = useSession()


  const { data, refetch, loading } = useQuery(TRANSACTIONS_QUERY, {
    client: gqlClient,
    fetchPolicy: 'cache-first',
    initialFetchPolicy: 'cache-and-network', 
    onCompleted: (data) => {
      if (!data.transactions) {
        data.transactions = initialTransactions;
      }
    },
  });

  const handleTransactionAdded = () => {
    refetch();
  };


  if (status === "unauthenticated") {
    return <AccessDenied/>;
  }

  if (loading) return null;

  return (
    <section className="m-auto w-max[90%]">
                                                                        {/*@ts-ignore*/}
      <AddTransaction onTransactionAdded={handleTransactionAdded} userID={session?.user?.id} />
      <DataTable
        columns={columns}
        data={data?.transactions || initialTransactions}
      />
    </section>
  );
}
