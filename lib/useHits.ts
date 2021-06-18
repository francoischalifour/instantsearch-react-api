import connectHits from 'instantsearch.js/cjs/connectors/hits/connectHits';
import {
  HitsConnectorParams,
  HitsRenderState,
} from 'instantsearch.js/es/connectors/hits/connectHits';
import { noop } from './utils/noop';
import { useConnector } from './useConnector';

export function useHits(props: any) {
  return useConnector<HitsConnectorParams, HitsRenderState>(
    connectHits,
    props,
    {
      hits: [],
      bindEvent: noop,
      sendEvent: noop,
      results: undefined,
    }
  );
}
