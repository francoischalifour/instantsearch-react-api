import { createContext } from 'react';

export const PanelContext =
  createContext<null | {
    onRenderState: (params: Record<string, any>) => void;
  }>(null);
