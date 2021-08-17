import { useEffect, useState } from 'react';
import { useInstantSearchContext } from './useInstantSearchContext';

type SearchStatus = 'idle' | 'loading' | 'stalled';

export function useSearchStatus() {
  const search = useInstantSearchContext();
  const [status, setStatus] = useState<SearchStatus>(() =>
    search._isSearchStalled ? 'stalled' : 'idle'
  );

  useEffect(() => {
    function onRender() {
      setStatus(search._isSearchStalled ? 'stalled' : 'idle');
    }

    search.on('render', onRender);

    return () => {
      search.removeListener('render', onRender);
    };
  }, [search]);

  return { status };
}
