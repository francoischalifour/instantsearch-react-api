import { useInstantSearchContext } from './useInstantSearchContext';

export function useSearchState() {
  const search = useInstantSearchContext();
  const results = {
    // @TODO: get initial results from helper state
    query: '',
    page: 0,
    hitsPerPage: 20,
    hits: [],
    nbHits: 0,
    nbPages: 0,
    params: '',
    exhaustiveNbHits: true,
    exhaustiveFacetsCount: true,
    processingTimeMS: 0,
    ...search.mainIndex.getResults(),
  };

  return {
    query: results.query,
    isSearchStalled: search._isSearchStalled,
    uiState: search.getUiState(),
    renderState: search.renderState,
    helper: search.mainHelper,
    results,
  };
}
