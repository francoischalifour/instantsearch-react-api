import { useContext } from 'react';
import { InstantSearchContext } from './InstantSearchContext';

export function useInstantSearchContext() {
  const context = useContext(InstantSearchContext);

  if (context === null) {
    throw new Error('Hook must be used in InstantSearchContext.');
  }

  return context;
}
