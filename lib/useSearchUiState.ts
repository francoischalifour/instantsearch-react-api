import { dequal } from 'dequal';
import { useEffect, useState } from 'react';
import { useInstantSearchContext } from './useInstantSearchContext';

export function useSearchUiState() {
  const search = useInstantSearchContext();
  const [uiState, setUiState] = useState(() => search.getUiState());

  useEffect(() => {
    function onRender() {
      const nextUiState = search.getUiState();

      if (!dequal(uiState, nextUiState)) {
        setUiState(nextUiState);
      }
    }

    search.on('render', onRender);

    return () => {
      search.removeListener('render', onRender);
    };
  }, [search]);

  return uiState;
}
