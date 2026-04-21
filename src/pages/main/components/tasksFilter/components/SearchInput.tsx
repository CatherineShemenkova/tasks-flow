import { type ChangeEventHandler, type FC, useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input.tsx';
import { changeFilter, selectSearch } from '@/store/tasksSlice/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';

export const SearchInput: FC = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(changeFilter({ search: localSearch }));
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalSearch(e.target.value);
  };

  return (
    <div className="relative md:grow">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input className="h-9 pl-9" value={localSearch} placeholder="Search tasks..." onChange={handleSearch} />
    </div>
  );
};
