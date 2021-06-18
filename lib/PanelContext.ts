import { createContext, Dispatch, SetStateAction } from 'react';
import { noop } from './utils/noop';

export const PanelContext = createContext<{
  setCanRefine: Dispatch<SetStateAction<boolean>>;
}>({
  setCanRefine: noop,
});
