import connectSearchBox from 'instantsearch.js/cjs/connectors/search-box/connectSearchBox';
import {
  SearchBoxConnectorParams,
  SearchBoxRenderState,
  SearchBoxWidgetDescription,
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import { noop } from './utils/noop';

import { useConnector } from './useConnector';

export function useSearchBox(props: SearchBoxConnectorParams) {
  return useConnector<
    SearchBoxConnectorParams,
    SearchBoxRenderState,
    SearchBoxWidgetDescription
  >(connectSearchBox, props, {
    query: '',
    refine: noop,
    clear: noop,
    isSearchStalled: false,
  });
}
