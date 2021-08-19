import { useEffect } from 'react';
import { usePanelContext } from './usePanelContext';

type PanelWrapperProps = {
  canRefine: boolean;
  children: JSX.Element;
};

export function PanelWrapper({ canRefine, children }: PanelWrapperProps) {
  const { setCanRefine } = usePanelContext();

  useEffect(() => {
    setCanRefine(canRefine);
  }, [canRefine, setCanRefine]);

  return children;
}
