import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';


export type Transaction = {
  id: string
  amount: number
  description: string
  createdAt: string
  user: {
    name: string
  }
}


export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Concepto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }, cell: ({ row }) => (
      <div className="capitalize">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Monto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }, cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {(() => {
          const date = new Date(parseInt(row.original.createdAt));
          return (
            date.toLocaleDateString() +
            ' ' +
            date.toLocaleTimeString()
          );
        })()}
      </div>
    ),
  },
  {
    accessorKey: 'user',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    //@ts-ignore
    cell: ({ row }) => <div className="lowercase">{row.getValue('user').name}</div>,
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID de transacción
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
