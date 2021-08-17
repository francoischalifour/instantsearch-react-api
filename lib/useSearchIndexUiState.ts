import { useIndexContext } from './useIndexContext';
import { useSearchUiState } from './useSearchUiState';

export function useSearchIndexUiState() {
  const uiState = useSearchUiState();
  const searchIndex = useIndexContext();
  const indexId = searchIndex.getIndexId();
  const indexUiState = uiState[indexId] || {};

  return indexUiState;
}
