import { MultiResponse, Widget } from 'instantsearch.js';
import { IndexWidget } from 'instantsearch.js/es/widgets/index/index';
import { useEffect, useState } from 'react';
import { useInstantSearchContext } from './useInstantSearchContext';

function isIndexWidget(widget: Widget | IndexWidget): widget is IndexWidget {
  return widget.$$type === 'ais.index';
}

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
      const nextResults = indexWidgets.flatMap((widget) => ({
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
        ...widget.getResults()?._rawResults,
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
