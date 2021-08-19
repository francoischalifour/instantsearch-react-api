import connectMenu from 'instantsearch.js/cjs/connectors/menu/connectMenu';
import {
  MenuConnectorParams,
  MenuRenderState,
  MenuWidgetDescription,
} from 'instantsearch.js/es/connectors/menu/connectMenu';
import { noop } from './utils';
import { useConnector } from './useConnector';

export function useMenu(props: MenuConnectorParams) {
  return useConnector<
    MenuConnectorParams,
    MenuRenderState,
    MenuWidgetDescription
  >(connectMenu, props, {
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
