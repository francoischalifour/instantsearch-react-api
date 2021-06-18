import instantsearch, { InstantSearchOptions } from 'instantsearch.js';
import { useEffect, useMemo } from 'react';

type UseInstantSearchProps = InstantSearchOptions;

export function useInstantSearch(props: UseInstantSearchProps) {
  const search = useMemo(() => instantsearch(props), [props]);

  useEffect(() => {
    search.start();

    return () => {
      search.dispose();
    };
  }, [search]);

  return search;
}
