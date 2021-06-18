import connectPagination from 'instantsearch.js/cjs/connectors/pagination/connectPagination';
import {
  PaginationConnectorParams,
  PaginationRenderState,
} from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { useConnector } from './useConnector';
import { noop } from './utils';

export function usePagination(props: PaginationConnectorParams) {
  return useConnector<PaginationConnectorParams, PaginationRenderState>(
    connectPagination,
    props,
    {
      canRefine: false,
      createURL: () => '#',
      currentRefinement: 0,
      isFirstPage: true,
      isLastPage: true,
      nbHits: 0,
      nbPages: 0,
      pages: [],
      refine: noop,
    }
  );
}
