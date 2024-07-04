import { gqlClient } from '@/graphql/client';
import { TRANSACTIONS_QUERY } from '@/graphql/queries';
import { GetServerSideProps } from 'next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Badge } from '@/components/ui/badge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({
  transactions,
  total,
}: {
  transactions: Transaction[];
  total: number;
}) {
  const labels = transactions.map((transaction) =>
    new Date(Number.parseInt(transaction.createdAt)).toLocaleDateString()
  );

  console.log(labels);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: labels.map(
          (_, index) =>
            transactions.map((transaction) =>
              transaction.amount > 0 ? transaction.amount : null
            )[index]
        ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Egresos',
        data: labels.map(
          (_, index) =>
            transactions.map((transaction) =>
              transaction.amount < 0 ? transaction.amount : null
            )[index]
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Badge>Total: ${total}</Badge>
        {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
      <Bar options={options} data={data} />;{' '}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await gqlClient.query({ query: TRANSACTIONS_QUERY });
    return {
      props: {
        transactions: data.data.transactions,
        total: data.data.transactions.reduce(
          (acc: any, curr: { amount: number }) => acc + curr.amount,
          0
        ),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        transactions: [],
      },
    };
  }
};

type Transaction = {
  id: string; // UUID
  amount: number;
  description: string;
  userId: string;
  transactionDate: string; // Fecha real de la transacción
  createdAt: string; // Fecha donde es creado en la base de datos
  updatedAt: string;
};
