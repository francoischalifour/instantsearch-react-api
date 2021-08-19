import { MultiResponse } from 'instantsearch.js';

import { useEffect, useState } from 'react';
import { isIndexWidget } from './isIndexWidget';
import { useInstantSearchContext } from './useInstantSearchContext';

export function useSearchResults<THit = any>() {
  const search = useInstantSearchContext();
  const [results, setResults] = useState<MultiResponse<THit>>(() => ({
    results: [],
  }));

  useEffect(() => {
    function onRender() {
      const indexWidgets = [
        search.mainIndex,
        ...search.mainIndex.getWidgets().filter(isIndexWidget),
      ];
      const nextResults = indexWidgets.map((widget) => ({
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
        index: widget.getIndexName(),
        ...widget.getResults()?._rawResults[0],
      }));

      setResults({ results: nextResults });
    }

    search.on('render', onRender);

    return () => {
      search.removeListener('render', onRender);
    };
  }, [search]);

  return results;
}
