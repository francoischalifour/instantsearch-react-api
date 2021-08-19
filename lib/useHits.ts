import connectHits from 'instantsearch.js/cjs/connectors/hits/connectHits';
import {
  HitsConnectorParams,
  HitsRenderState,
  HitsWidgetDescription,
} from 'instantsearch.js/es/connectors/hits/connectHits';
import { SearchResults } from 'algoliasearch-helper';

import { noop } from './utils/noop';
import { useConnector } from './useConnector';
import { useSearchIndexResults } from './useSearchIndexResults';
import { useIndexContext } from './useIndexContext';

export function useHits(props: HitsConnectorParams) {
  const searchIndex = useIndexContext();
  const results = useSearchIndexResults();
  const helper = searchIndex.getHelper();

  return useConnector<
    HitsConnectorParams,
    HitsRenderState,
    HitsWidgetDescription
  >(connectHits, props, {
    hits: results.hits,
    bindEvent: () => '',
    sendEvent: noop,
    results: helper ? new SearchResults(helper.state, [results]) : undefined,
  });
}
