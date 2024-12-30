import { Column } from '@tanstack/react-table';
import React from 'react';
import { DataTableFacetedFilter } from '../reusable/faceted-filter';
import { getDropDownValues } from '@/lib/utils';

interface FacetedFilteredProps<TData> {
  columns: {
    col: Column<TData, unknown>;
    name: string;
    title: string;
  }[];
  data: TData[];
}

export function FacetedFilters<TData>({ columns, data }: FacetedFilteredProps<TData>) {
  if (columns?.length) {
    return (
      <div className="flex gap-3">
        {columns.map(col => (
          <div className="grid" key={col.name}>
            <DataTableFacetedFilter
              column={col.col}
              title={col.title}
              options={getDropDownValues(data, col.name)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default FacetedFilters;

