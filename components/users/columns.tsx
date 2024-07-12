/*
* Definición de las columnas de la tabla de transacciones
* Se utiliza la librería @tanstack/react-table y diseño de shadcn
*/
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

import EditProfile from '@/components/users/edit-profile';
import { User } from '@/types';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Correo
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className='lowercase'>{row.getValue('email')}</div>;
    },
  },
  {
    accessorKey: 'telephone',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Telefono
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('telephone')}</div>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
  
    header: 'Actions',
    cell: (tanstack) => (
      //Cada fila de la tabla tiene un boton de editar que abre un modal con el componente EditProfile
      <EditProfile
        name={tanstack.row.original.name}
        userID={tanstack.row.original.id}
        //@ts-ignore
        role={tanstack.row.original.role}
        onSave={(user) => {
          // TODO: Tanstack sucks
          tanstack.cell.row.original.name = user.name;
          tanstack.cell.row.original.role = user.role;
        }}
      ></EditProfile>
    ),
  },
];
