import connectPagination from 'instantsearch.js/cjs/connectors/pagination/connectPagination';
import {
  PaginationConnectorParams,
  PaginationRenderState,
  PaginationWidgetDescription,
} from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { useConnector } from './useConnector';
import { useSearchIndexResults } from './useSearchIndexResults';
import { noop } from './utils';

export function usePagination(props: PaginationConnectorParams) {
  const results = useSearchIndexResults();

  return useConnector<
    PaginationConnectorParams,
    PaginationRenderState,
    PaginationWidgetDescription
  >(connectPagination, props, {
    canRefine: results.nbPages > 1,
    createURL: () => '#',
    currentRefinement: results.page,
    isFirstPage: results.page === 0,
    isLastPage: results.page === results.nbPages - 1,
    nbHits: results.nbHits,
    nbPages: results.nbPages,
    // @TODO: get from Pager
    pages: [],
    refine: noop,
  });
}
