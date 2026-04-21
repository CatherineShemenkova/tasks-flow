import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function itemEqualToItemId(item1: Record<string, any>, item2: Record<string, any>) {
  return item1.id === item2.id;
}
