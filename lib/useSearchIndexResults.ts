import { useIndexContext } from './useIndexContext';
import { useSearchResults } from './useSearchResults';

export function useSearchIndexResults() {
  const { results } = useSearchResults();
  const searchIndex = useIndexContext();
  const indexName = searchIndex.getIndexName();
  const indexResults = {
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
    index: indexName,
    ...results.find((result) => result.index === indexName),
  };

  return indexResults;
}
