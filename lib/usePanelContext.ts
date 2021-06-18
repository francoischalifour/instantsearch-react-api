import { useContext } from 'react';
import { PanelContext } from './PanelContext';

export function usePanelContext() {
  return useContext(PanelContext);
}
