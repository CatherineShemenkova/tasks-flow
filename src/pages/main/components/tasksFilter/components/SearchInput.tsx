import type { ChangeEventHandler, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input.tsx';
import { onFilterChange } from '@/store/tasksSlice';

interface SearchInputProps {
  value: string;
}

export const SearchInput: FC<SearchInputProps> = ({ value }) => {
  const dispatch = useDispatch();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(onFilterChange({ search: e.target.value }));
  };

  return (
    <div className="relative md:grow">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input className="h-[38px] pl-9" value={value} placeholder="Search tasks..." onChange={handleSearch} />
    </div>
  );
};
