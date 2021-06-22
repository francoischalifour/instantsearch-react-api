import connectRefinementList from 'instantsearch.js/cjs/connectors/refinement-list/connectRefinementList';
import {
  RefinementListConnectorParams,
  RefinementListRenderState,
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { noop } from './utils';
import { useConnector } from './useConnector';

export function useRefinementList(props: RefinementListConnectorParams) {
  const state = useConnector<
    RefinementListConnectorParams,
    RefinementListRenderState
  >(connectRefinementList, props, {
    items: [],
    refine: noop,
    canRefine: false,
    canToggleShowMore: false,
    createURL: () => '#',
    hasExhaustiveItems: false,
    isFromSearch: false,
    isShowingMore: false,
    searchForItems: noop,
    sendEvent: noop,
    toggleShowMore: noop,
  });

  return {
    ...state,
    items: state.items.map((item) => ({
      ...item,
      _highlightResult: {
        label: {
          value: item.highlighted,
        },
      },
    })),
  };
}
