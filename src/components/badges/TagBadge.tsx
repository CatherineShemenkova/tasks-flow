import { type ComponentType, createElement, type FC, type MouseEventHandler } from 'react';
import { X, Tag } from 'lucide-react';

import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/utils';

interface TagBadgeProps {
  label: string;
  onClick?: VoidFunction;
  removable?: boolean;
  withIcon?: boolean;
  icon?: ComponentType;
}

export const TagBadge: FC<TagBadgeProps> = ({ label, onClick, removable, withIcon, icon = Tag }) => {
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
      {withIcon && createElement(icon)}
      {label}
      {removable && <X />}
    </Badge>
  );
};
