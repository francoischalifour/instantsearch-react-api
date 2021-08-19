import connectHitsPerPage from 'instantsearch.js/cjs/connectors/hits-per-page/connectHitsPerPage';
import {
  HitsPerPageConnectorParams,
  HitsPerPageRenderState,
  HitsPerPageWidgetDescription,
} from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage';

import { noop } from './utils/noop';
import { useConnector } from './useConnector';
import { useSearchIndexResults } from './useSearchIndexResults';

export function useHitsPerPage(props: HitsPerPageConnectorParams) {
  const results = useSearchIndexResults();

  return useConnector<
    HitsPerPageConnectorParams,
    HitsPerPageRenderState,
    HitsPerPageWidgetDescription
  >(connectHitsPerPage, props, () => {
    return {
      items: [],
      hasRefinements: results.nbHits === 0,
      refine: noop,
      createURL: () => '#',
    };
  });
}
