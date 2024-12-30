import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery, useQueryClient } from 'react-query';
import { getPosts, postQueriesKeys } from '@/api/post';
import {
  HiArrowsUpDown,
  HiOutlineArrowLeftCircle,
  HiOutlineArrowRightCircle,
} from 'react-icons/hi2';
import { Checkbox } from '@/components/ui/checkbox';
import { moveColumnsDown, moveColumnsUp } from '@/lib/utils';
import { Post } from '@/types/post';
import { userQueriesKeys } from '@/api/user';

function getColumns(users: User[]) {
  const columns: ColumnDef<Post>[] = [
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
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <div className="flex justify-between py-2 text-left">
            Titre
            <HiArrowsUpDown
              className="w-4 h-4 ml-2 cursor-pointer"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        const { title } = row.original;
        return <div className="font-medium text-left ">{title}</div>;
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
      accessorKey: 'author',
      header: ({ column }) => {
        return (
          <div className="flex justify-between py-2 text-left">
            Auteur
            <HiArrowsUpDown
              className="w-4 h-4 ml-2 cursor-pointer"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        const { author_id } = row.original;
        const author = users.find(user => user.id === author_id);
        if (author) {
          return (
            <div className="text-left">
              {author.firstName} {author.lastName}
            </div>
          );
        }
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
  ];

  return columns;
}

export function usePostTable() {
  const queryClient = useQueryClient();
  const users = queryClient.getQueryData<User[]>(userQueriesKeys.list());
  const { data, isLoading, isError, error } = useQuery<Post[], Error>({
    queryKey: postQueriesKeys.list(),
    queryFn: getPosts,
  });

  return {
    postsData: data,
    postsColumns: users ? getColumns(users) : [],
    isLoadingPosts: isLoading,
    isErrorPosts: isError,
    postsErrors: error,
  };
}

