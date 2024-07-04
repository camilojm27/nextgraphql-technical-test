import { gql, useQuery } from '@apollo/client';
import { columns } from '@/components/users/columns';
import { DataTable } from '@/components/transactions/data-table';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gqlClient } from '@/graphql/client';
import { USERS_QUERY } from '@/graphql/queries';



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
  const { data, refetch, loading } = useQuery(QUERY, {
    client: gqlClient,
    fetchPolicy: 'cache-and-network', // Ensure that the query runs both on client and server
    initialFetchPolicy: 'network-only', // Run the query on client side even if there is data in cache
    onCompleted: (data) => {
      if (!data.users) {
        data.users = users;
      }
    },
  });

  const handleTransactionAdded = () => {
    refetch();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(users)}</pre>
      <DataTable columns={columns} data={data?.users || users} />
    </div>
  );
}
