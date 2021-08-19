import connectHierarchicalMenu from 'instantsearch.js/cjs/connectors/hierarchical-menu/connectHierarchicalMenu';
import {
  HierarchicalMenuConnectorParams,
  HierarchicalMenuRenderState,
  HierarchicalMenuWidgetDescription,
} from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu';
import { noop } from './utils';
import { useConnector } from './useConnector';

export function useHierarchicalMenu(props: HierarchicalMenuConnectorParams) {
  return useConnector<
    HierarchicalMenuConnectorParams,
    HierarchicalMenuRenderState,
    HierarchicalMenuWidgetDescription
  >(connectHierarchicalMenu, props, {
    items: [],
    refine: noop,
    canRefine: false,
    canToggleShowMore: false,
    createURL: () => '#',
    isShowingMore: false,
    sendEvent: noop,
    toggleShowMore: noop,
  });
}
