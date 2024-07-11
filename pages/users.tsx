import { useQuery } from '@apollo/client';
import { columns } from '@/components/users/columns';
import { DataTable } from '@/components/transactions/data-table';
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

// Define the component to display the data
export default function Users({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { data: session, status } = useSession()
  if (typeof window === "undefined") return null


  const { data, refetch, loading } = useQuery(USERS_QUERY, {
    client: gqlClient,
    fetchPolicy: 'cache-first',
    initialFetchPolicy: 'cache-and-network', 
    onCompleted: (data) => {
      if (!data.users) {
        data.users = users;
      }
    },
  });

  const handleTransactionAdded = () => {
    refetch();
  };
  {/*@ts-ignore*/}
  if (status === "unauthenticated" || session?.user.role !== 'ADMIN') {
    return <AccessDenied/>;
  }

  if (loading) return null;

  return (
    <div className="m-auto ">
      {/* <pre>{JSON.stringify(users)}</pre> */}
      <DataTable columns={columns} data={data?.users || users} />
    </div>
  );
}
