import connectSearchBox from 'instantsearch.js/cjs/connectors/search-box/connectSearchBox';
import {
  SearchBoxConnectorParams,
  SearchBoxRenderState,
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import { noop } from './utils/noop';

import { useConnector } from './useConnector';

export function useSearchBox(props: any) {
  return useConnector<SearchBoxConnectorParams, SearchBoxRenderState>(
    connectSearchBox,
    props,
    {
      query: '',
      refine: noop,
      clear: noop,
      isSearchStalled: false,
    }
  );
}
