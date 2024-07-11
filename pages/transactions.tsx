import { gql, useQuery } from '@apollo/client';
import { columns } from '@/components/transactions/columns';
import { DataTable } from '@/components/transactions/data-table';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AddTransaction from '@/components/transactions/add-transaction';
import { gqlClient } from '@/graphql/client';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/auth/acces-denied';

// Define the GraphQL query
const QUERY = gql`
  query ExampleQuery {
    transactions {
      id
      amount
      description
      userId
      createdAt
      updatedAt
      user {
        name
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await gqlClient.query({
      query: QUERY,
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

// Define the component to display the data
export default function Transactions({
  initialTransactions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (typeof window === "undefined") return null

  const { data: session, status } = useSession()


  const { data, refetch, loading } = useQuery(QUERY, {
    client: gqlClient,
    fetchPolicy: 'cache-and-network', // Ensure that the query runs both on client and server
    initialFetchPolicy: 'network-only', // Run the query on client side even if there is data in cache
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-auto w-max[90%]">
      <AddTransaction onTransactionAdded={handleTransactionAdded} userID={session?.user?.id} />
      <DataTable
        columns={columns}
        data={data?.transactions || initialTransactions}
      />
    </div>
  );
}
