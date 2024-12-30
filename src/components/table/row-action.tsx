import React from 'react';
import { Button } from '../ui/button';

export interface ActionType {
  type: 'edit' | 'delete';
}

type RowActionProps<TData> = {
  item: TData & { id: number };
} & ActionType;

export function RowAction<TData>({ type, item }: RowActionProps<TData>) {
  if (type === 'edit')
    return (
      <Button size={'sm'} onClick={() => alert(`navigate to /${item.id}/${type}`)}>
        Editer
      </Button>
    );

  if (type === 'delete')
    return (
      <Button size={'sm'} variant={'destructive'} onClick={() => alert(`deleting ${item.id}`)}>
        Supprimer
      </Button>
    );
}

