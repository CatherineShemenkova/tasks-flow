import { type FC, useEffect, useRef, useState } from 'react';

import { Spinner } from '@/components/ui/spinner.tsx';

export const ScreenLoader: FC = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spinner className="size-10" />
  </div>
);

interface DelayedLoaderProps {
  delay?: number;
}

export const DelayedLoader: FC<DelayedLoaderProps> = ({ delay = 500 }) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timer.current);
  }, [delay]);

  return showLoader ? <Spinner className="text-muted-foreground" /> : null;
};
