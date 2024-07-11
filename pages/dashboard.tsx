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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/auth/acces-denied';

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
  income,
  outgoings,
}: {
  transactions: Transaction[];
  total: number;
  income: number;
  outgoings: number;
}) {
  const { data: session, status } = useSession()

  if (typeof window === "undefined") return null

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

  if (status === "unauthenticated" || session?.user.role !== 'ADMIN') {
    return <AccessDenied/>;
  }

  return (
    <div>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <Card x-chunk='dashboard-01-chunk-0'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Balance general
              </CardTitle>

              <DollarSignIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${total.toLocaleString()}
              </div>
              <p className='text-xs text-muted-foreground'>
                La suma de los ingresos y egresos
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-1'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Ingresos totales
              </CardTitle>
              <UsersIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${income.toLocaleString()}
              </div>
              <p className='text-xs text-muted-foreground'>
                Total de ingresos
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Egresos Totales
              </CardTitle>
              <CreditCardIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${outgoings.toLocaleString()}
              </div>
              <p className='text-xs text-muted-foreground'>
                total de egresos
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk='dashboard-01-chunk-3'
            className='bg-slate-800 text-white hover:cursor-pointer text-center'
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <ActivityIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <h1 className='text-2xl font-bold'>Descargar CSV</h1>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
            <CardContent>
              <Bar options={options} data={data} />;{' '}
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-5'>
            <CardHeader className='flex flex-row items-center'>
              <div className='grid gap-2'>
                <CardTitle>Ultimas transaciones</CardTitle>
                <CardDescription>
                  Las 10 ultimas transacciones realizadas por los usuarios
                </CardDescription>
              </div>
              <Button asChild size='sm' className='ml-auto gap-1'>
                <Link href='/transactions'>
                  View All
                  <ArrowUpRightIcon className='h-4 w-4' />
                </Link>
              </Button>
            </CardHeader>
            {transactions.toReversed().map(
              (transaction, index) =>
                index <= 10 && (
                  <CardContent className='grid gap-8'>
                    <div className='flex items-center gap-4'>
                      <Avatar className='hidden h-9 w-9 sm:flex'>
                        <AvatarImage src='/placeholder-user.jpg' />
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <div className='grid gap-1'>
                        <p className='text-sm font-medium leading-none'>
                          {transaction.user.name}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {transaction.user.email}
                        </p>
                      </div>
                      <div className='ml-auto font-medium'>
                        ${transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                )
            )}
          </Card>
        </div>
      </main>
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
        income: data.data.transactions.reduce(
          (acc: any, curr: { amount: number }) =>
            curr.amount > 0 ? acc + curr.amount : acc,
          0
        ),
        outgoings: data.data.transactions.reduce(
          (acc: any, curr: { amount: number }) =>
            curr.amount < 0 ? acc + curr.amount : acc,
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


function ActivityIcon(props) {
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
      <path d='M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2' />
    </svg>
  );
}

function ArrowUpRightIcon(props) {
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
      <path d='M7 7h10v10' />
      <path d='M7 17 17 7' />
    </svg>
  );
}

function CircleUserIcon(props) {
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
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='10' r='3' />
      <path d='M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662' />
    </svg>
  );
}

function CreditCardIcon(props) {
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
      <rect width='20' height='14' x='2' y='5' rx='2' />
      <line x1='2' x2='22' y1='10' y2='10' />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1='12' x2='12' y1='2' y2='22' />
      <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function Package2Icon(props) {
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

function SearchIcon(props) {
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
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}
