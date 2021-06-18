import { useContext } from 'react';
import { IndexContext } from './IndexContext';

export function useIndexContext() {
  const context = useContext(IndexContext);

  if (context === null) {
    throw new Error('Hook must be used in IndexContext.');
  }

  return context;
}
