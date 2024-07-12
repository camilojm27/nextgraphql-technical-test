/**
 * Página de inicio del dashboard
 * Solo los administradores pueden acceder a la pagina
 * Los datos son calculados en el servidor
 * El csv es generado en el cliente como blob
 */
//TDOO: Agregar un selector de fecha para filtrar las transacciones
import { gqlClient } from '@/graphql/client';
import { TRANSACTIONS_QUERY } from '@/graphql/queries';
import { GetServerSideProps } from 'next';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/auth/acces-denied';
import Papa from 'papaparse';
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from 'lucide-react';
import { Transaction } from '@/types';

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
  const { data: session, status } = useSession();

  const labels = transactions.map((transaction) =>
    new Date(Number.parseInt(transaction.createdAt)).toLocaleDateString()
  );

  // Configuración de la gráfica
  const options = {
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Ingresos y Egresos',
      // },
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
  // Datos de la gráfica
  // TODO: Normalizar los datos
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
  //@ts-ignore
  if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
    return <AccessDenied />;
  }
  // Creamos el archivo CSV
  const downloadCSV = () => {
    const csvData = transactions.map((transaction) => ({
      Id: transaction.id,
      Amount: transaction.amount,
      Description: transaction.description,
      UserName: transaction.user.name,
      UserEmail: transaction.user.email,
      UserId: transaction.userId,
      CreatedAt: new Date(
        Number.parseInt(transaction.createdAt)
      ).toLocaleDateString(),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  return (
    <div>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <Card x-chunk='dashboard-01-chunk-0'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Balance general
              </CardTitle>

              <DollarSign className='h-4 w-4 text-muted-foreground' />
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
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${income.toLocaleString()}
              </div>
              <p className='text-xs text-muted-foreground'>Total de ingresos</p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Egresos Totales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${outgoings.toLocaleString()}
              </div>
              <p className='text-xs text-muted-foreground'>total de egresos</p>
            </CardContent>
          </Card>
          <Card
            x-chunk='dashboard-01-chunk-3'
            className='bg-slate-800 text-white hover:cursor-pointer text-center'
            id='download-csv'
            onClick={downloadCSV}
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Activity className='h-4 w-4 text-muted-foreground' />
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
                  <ArrowUpRight className='h-4 w-4' />
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
/**
 * Calculamos el total de ingresos y egresos  en el servidor
 * */

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=30'
  )
  
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
            curr.amount > 0 ? acc + curr.amount : acc, // Suma todas las transacciones que sean mayores a 0
          0
        ),
        outgoings: data.data.transactions.reduce(
          (acc: any, curr: { amount: number }) =>
            curr.amount < 0 ? acc + curr.amount : acc, // Suma todas las transacciones menores que 0
          0
        ),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        transactions: [],
        total: 0,
        income: 0,
        outgoings: 0,
      },
    };
  }
};
