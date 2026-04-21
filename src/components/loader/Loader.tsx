import { type FC, useEffect, useState } from 'react';

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
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return showLoader ? <Spinner className="text-muted-foreground" /> : null;
};
