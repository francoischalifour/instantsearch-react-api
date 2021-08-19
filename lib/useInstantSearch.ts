import { version as ReactVersion } from 'react';
import { dequal } from 'dequal/lite';
import instantsearch, { InstantSearchOptions, UiState } from 'instantsearch.js';
import { useEffect, useMemo, useRef } from 'react';

import { version } from './version';
import { useStableValue } from './useStableValue';

export type UseInstantSearchProps = InstantSearchOptions & {
  refresh?: boolean;
  uiState?: UiState;
};

export function useInstantSearch({
  refresh,
  uiState,
  ...props
}: UseInstantSearchProps) {
  const stableProps = useStableValue(props);
  const stableUiState = useStableValue(uiState);
  const search = useMemo(() => instantsearch(stableProps), [stableProps]);

  useEffect(() => {
    if (typeof props.searchClient.addAlgoliaAgent === 'function') {
      props.searchClient.addAlgoliaAgent(`react (${ReactVersion})`);
      props.searchClient.addAlgoliaAgent(`react-instantsearch (${version})`);
    }
  }, [props.searchClient]);

  useEffect(() => {
    search.start();

    return () => {
      search.dispose();
    };
  }, [search]);

  useEffect(() => {
    if (!stableUiState || Object.keys(stableUiState).length === 0) {
      return;
    }

    search.setUiState(stableUiState);
  }, [stableUiState, search]);

  useEffect(() => {
    if (!refresh) {
      return;
    }

    search.refresh();
  }, [refresh, search]);

  return search;
}
