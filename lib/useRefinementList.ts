import connectRefinementList from 'instantsearch.js/cjs/connectors/refinement-list/connectRefinementList';
import {
  RefinementListConnectorParams,
  RefinementListRenderState,
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { useConnector } from './useConnector';

export function useRefinementList(props: RefinementListConnectorParams) {
  return useConnector<RefinementListConnectorParams, RefinementListRenderState>(
    connectRefinementList,
    props,
    {
      items: [],
      refine(_x) {},
      canRefine: false,
      canToggleShowMore: false,
      createURL: () => '#',
      hasExhaustiveItems: false,
      isFromSearch: false,
      isShowingMore: false,
      searchForItems() {},
      sendEvent() {},
      toggleShowMore() {},
    }
  );
}
