import { useEffect } from 'react';
import { usePanelContext } from './usePanelContext';

type PanelWrapperProps = {
  canRefine: boolean;
  children: JSX.Element;
};

export function PanelWrapper(props: PanelWrapperProps) {
  const { setCanRefine } = usePanelContext();
  const { canRefine } = props;

  useEffect(() => {
    setCanRefine(canRefine);
  }, [canRefine, setCanRefine]);

  return props.children;
}
