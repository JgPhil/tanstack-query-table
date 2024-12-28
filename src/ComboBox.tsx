import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ComboboxProps {
  items: { id: number; value: any }[];
  value: any;
  onChange: (value: any) => void;
  required: boolean;
  name: string;
}

export function Combobox(props: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const { items, value, required = false, onChange, name } = props;

  return (
    <div className="flex items-center">
      <input type="hidden" required={required} value={value} name={name} onChange={onChange} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {value?.value ? <>{value.value}</> : <>+ Choisissez</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map(item => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                  >
                    {item.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

