import { type FC, type MouseEventHandler } from 'react';
import { Tag, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/utils/ui.ts';

interface TagBadgeProps {
  label: string;
  onClick?: VoidFunction;
  removable?: boolean;
  withIcon?: boolean;
}

export const TagBadge: FC<TagBadgeProps> = ({ label, onClick, removable, withIcon }) => {
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'shrink-0',
        onClick ? 'hover:bg-primary hover:text-background cursor-pointer' : 'pointer-events-none'
      )}
      onClick={handleClick}
    >
      {withIcon && <Tag />}
      {label}
      {removable && <X />}
    </Badge>
  );
};
