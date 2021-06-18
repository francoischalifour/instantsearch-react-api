import { PaginationConnectorParams } from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { usePagination } from './usePagination';
import { cx } from './utils';

export type PaginationProps = PaginationConnectorParams;

export function Pagination(props: PaginationProps) {
  const { refine, pages, currentRefinement, isFirstPage, isLastPage, nbPages } =
    usePagination(props);

  return (
    <div className="ais-Pagination">
      <ul className="ais-Pagination-list">
        <PaginationItem
          className={cx(
            'ais-Pagination-item',
            'ais-Pagination-item--firstPage'
          )}
          aria-label="First"
          isDisabled={isFirstPage}
          onClick={(event) => {
            event.preventDefault();
            refine(0);
          }}
        >
          ‹‹
        </PaginationItem>

        <PaginationItem
          className={cx(
            'ais-Pagination-item',
            'ais-Pagination-item--previousPage'
          )}
          aria-label="Previous"
          isDisabled={isFirstPage}
          onClick={(event) => {
            event.preventDefault();
            refine(currentRefinement - 1);
          }}
        >
          ‹
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem
            key={page}
            className={cx(
              'ais-Pagination-item',
              page === currentRefinement && 'ais-Pagination-item--selected'
            )}
            aria-label={page}
            isDisabled={false}
            onClick={(event) => {
              event.preventDefault();
              refine(page);
            }}
          >
            {page + 1}
          </PaginationItem>
        ))}

        <PaginationItem
          className={cx('ais-Pagination-item', 'ais-Pagination-item--nextPage')}
          aria-label="Next"
          isDisabled={isLastPage}
          onClick={(event) => {
            event.preventDefault();
            refine(currentRefinement + 1);
          }}
        >
          ›
        </PaginationItem>

        <PaginationItem
          className={cx('ais-Pagination-item', 'ais-Pagination-item--lastPage')}
          aria-label="Last"
          isDisabled={isLastPage}
          onClick={(event) => {
            event.preventDefault();
            refine(nbPages - 1);
          }}
        >
          ››
        </PaginationItem>
      </ul>
    </div>
  );
}

type PaginationItemProps = {
  isDisabled: boolean;
  className: string;
  onClick(event: any): void;
  children: number | string | JSX.Element;
};

function PaginationItem(props: PaginationItemProps) {
  const { isDisabled, className, ...rest } = props;

  if (isDisabled) {
    return (
      <li className={cx(className, 'ais-Pagination-item--disabled')}>
        <span className="ais-Pagination-link" {...rest} />
      </li>
    );
  }

  return (
    <li className={className}>
      <a className="ais-Pagination-link" href="#" {...rest} />
    </li>
  );
}
