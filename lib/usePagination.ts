import connectPagination from 'instantsearch.js/cjs/connectors/pagination/connectPagination';
import {
  PaginationConnectorParams,
  PaginationRenderState,
} from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { useConnector } from './useConnector';
import { useSearchState } from './useSearchState';
import { noop } from './utils';

export function usePagination(props: PaginationConnectorParams) {
  const { results } = useSearchState();

  return useConnector<PaginationConnectorParams, PaginationRenderState>(
    connectPagination,
    props,
    {
      canRefine: results.nbPages > 1,
      createURL: () => '#',
      currentRefinement: results.page,
      isFirstPage: results.page === 0,
      isLastPage: results.page === results.nbPages - 1,
      nbHits: results.nbHits,
      nbPages: results.nbPages,
      pages: [],
      refine: noop,
    }
  );
}
