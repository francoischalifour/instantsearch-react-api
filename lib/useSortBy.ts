import connectSortBy from 'instantsearch.js/cjs/connectors/sort-by/connectSortBy';
import {
  SortByConnectorParams,
  SortByRenderState,
  SortByWidgetDescription,
} from 'instantsearch.js/es/connectors/sort-by/connectSortBy';

import { noop } from './utils/noop';
import { useConnector } from './useConnector';
import { useSearchIndexResults } from './useSearchIndexResults';
import { useIndexContext } from './useIndexContext';

export function useSortBy(props: SortByConnectorParams) {
  const searchIndex = useIndexContext();
  const results = useSearchIndexResults();
  const helper = searchIndex.getHelper();

  return useConnector<
    SortByConnectorParams,
    SortByRenderState,
    SortByWidgetDescription
  >(connectSortBy, props, () => {
    const currentRefinement = helper ? helper.state.index : '';
    const transformItems = props.transformItems || ((x) => x);

    return {
      currentRefinement,
      options: transformItems(props.items),
      refine: noop,
      hasNoResults: results.nbHits === 0,
    };
  });
}
