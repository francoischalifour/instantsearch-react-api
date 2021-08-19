import { IndexUiState } from 'instantsearch.js';
import { useIndexContext } from './useIndexContext';
import { useInstantSearchContext } from './useInstantSearchContext';
import { useSearchUiState } from './useSearchUiState';

export function useSearchIndexUiState() {
  const search = useInstantSearchContext();
  const uiState = useSearchUiState();
  const searchIndex = useIndexContext();
  const indexId = searchIndex.getIndexId();
  const indexUiState = uiState[indexId] || {};

  function setUiState(
    nextUiState: IndexUiState | ((nextUiState: IndexUiState) => IndexUiState)
  ) {
    if (typeof nextUiState === 'function') {
      search.setUiState((prevUiState) => {
        return {
          ...prevUiState,
          [indexId]: nextUiState(prevUiState[indexId]),
        };
      });
    } else {
      search.setUiState((prevUiState) => ({
        ...prevUiState,
        [indexId]: nextUiState,
      }));
    }
  }

  return { uiState: indexUiState, setUiState };
}
