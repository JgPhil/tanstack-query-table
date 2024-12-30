import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'react-query';
import { getUsers, userQueriesKeys } from '@/api/user';
import {
  HiArrowsUpDown,
  HiOutlineArrowLeftCircle,
  HiOutlineArrowRightCircle,
} from 'react-icons/hi2';
// import { RiMore2Fill } from 'react-icons/ri';
import { Checkbox } from '@/components/ui/checkbox';
import { moveColumnsDown, moveColumnsUp } from '@/lib/utils';
import RowActions from '@/components/table/row-actions';

// const columnHelper = createColumnHelper<User>();

// Définir les colonnes
const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Prenom
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const { firstName } = row.original;
      return <div className="font-medium text-left ">{firstName}</div>;
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Nom
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const { lastName } = row.original;
      return <div className="font-medium text-left ">{lastName}</div>;
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
  },
  {
    accessorKey: 'city',
    header: 'Ville',
    cell: ({ row }) => {
      const { city } = row.original;
      return <div className="font-medium text-left ">{city}</div>;
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
  },
  {
    accessorKey: 'age',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left ">
          Age
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('age')}</div>,
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <RowActions
        actions={[
          {
            type: 'edit',
          },
          {
            type: 'delete',
          },
        ]}
        item={row.original}
        key={row.id}
      />
    ),
  },
];

// export default function UserTable() {
//   const {
//     data: users,
//     isLoading: isLoadingUsers,
//     isError: isErrorUsers,
//     error: errorUsers,
//   } = useQuery<User[], Error>({
//     queryKey: ['author', 'list'],
//     queryFn: getUsers,
//   });

//   return <DataTable columns={columns} data={users} />;
// }

const initialState = {
  pagination: {
    pageSize: 12,
  },
};

export const useUserTable = () => {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: userQueriesKeys.list(),
    queryFn: getUsers,
  });

  return {
    usersData: data,
    usersColumns: columns,
    isLoadingUsers: isLoading,
    isErrorUsers: isError,
    usersErrors: error,
    usersInitialState: initialState,
  };
};

