import { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';
import { DataTablePagination } from '../reusable/pagination-controls';
import FacetedFilters from '../table/faceted-filters';
import { FacetedFiltersColumns } from '@/types/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  facetedFilters?: FacetedFiltersColumns;
  initialState?: InitialTableState;
  // table: TanstackTable<TData>; //HERE
}

export function DataTable<TData, TValue>({
  columns,
  data,
  facetedFilters,
  initialState = {
    pagination: { pageSize: 10 },
  },
}: DataTableProps<TData, TValue>) {
  //STATES:
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //row selection
    onRowSelectionChange: setRowSelection,
    //sorting:
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
    },
    //pagination:
    getPaginationRowModel: getPaginationRowModel(),
    //Order of columns
    onColumnOrderChange: setColumnOrder,

    //filters
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    //Faceted filters:
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),

    //Visibility:
    onColumnVisibilityChange: setColumnVisibility,

    //Control pagination. Default is 10
    initialState,

    //This can be added to insert custom functions, accessible :table.options.meta.methodName
    meta: {
      myOwnMethod: () => {
        console.log('Custom method');
      },
    },
  });

  //Used to show reset button
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div>
      <div className="flex justify-between py-4">
        <div className="grid grid-cols-1auto-cols-[10rem] grid-flow-col gap-4">
          {/* <Input
            placeholder="Filter by name"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          /> */}
          {/* <div className="flex-col"> */}
          {/* {table.getColumn('city') && (
              <DataTableFacetedFilter
                column={table.getColumn('city')}
                title="Ville"
                options={getDropDownValues(data, 'city')}
              />
            )}
          </div>
          <div>
            {table.getColumn('lastName') && (
              <DataTableFacetedFilter
                column={table.getColumn('lastName')}
                title="Nom"
                options={getDropDownValues(data, 'lastName')}
              />
            )} */}
          {facetedFilters?.columns?.length && (
            <FacetedFilters
              columns={facetedFilters.columns.map(column => ({
                col: table.getColumn(column.name)!,
                name: column.name,
                title: column.title,
              }))}
              data={data}
            />
          )}
          {/* </div> */}

          {isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="w-20 p-2">
              Clear filters
            </Button>
          )}
        </div>

        <Button
          onClick={() => {
            table.resetRowSelection();
            table.resetColumnFilters();
            table.resetColumnVisibility();
            table.resetColumnOrder();
          }}
          variant="outline"
          className="text-red-800 border-red-800"
        >
          Reset table
        </Button>
      </div>

      {/* Column selection button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Select columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-3 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow className="" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {/* <Separator orientation="vertical" /> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            {table.getFooterGroups().map(footerGroup => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-end pt-4">
        <DataTablePagination table={table}></DataTablePagination>
      </div>
    </div>
  );
}

