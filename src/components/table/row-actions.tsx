import React from 'react';
import { ActionType, RowAction } from './row-action';

interface RowActionsProps<TData> {
  actions: ActionType[];
  item: TData & { id: number };
}

function RowActions<TData>({ actions, item }: RowActionsProps<TData>) {
  return (
    <span className="flex gap-2">
      {actions.map((action, i) => (
        <RowAction key={i} item={item} type={action.type} />
      ))}
    </span>
  );
}

export default RowActions;

