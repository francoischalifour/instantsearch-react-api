import { MenuConnectorParams } from 'instantsearch.js/es/connectors/menu/connectMenu';
import { useMenu } from './useMenu';
import { cx } from './utils';

export type MenuProps = MenuConnectorParams;

export function Menu(props: MenuProps) {
  const {
    canRefine,
    canToggleShowMore,
    isShowingMore,
    items,
    refine,
    toggleShowMore,
  } = useMenu(props);

  return (
    <div className="ais-Menu">
      <ul className="ais-Menu-list">
        {items.map((item) => (
          <li
            key={item.value}
            className={cx(
              'ais-Menu-item',
              item.isRefined && 'ais-Menu-item--selected'
            )}
          >
            <a
              className="ais-Menu-link"
              href="#"
              onClick={(event) => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              <span className="ais-Menu-label">{item.label}</span>
              <span className="ais-Menu-count">{item.count}</span>
            </a>
          </li>
        ))}
      </ul>

      {props.showMore && (
        <button
          className={cx(
            'ais-Menu-showMore',
            !canToggleShowMore && 'ais-Menu-showMore--disabled'
          )}
          disabled={!canToggleShowMore}
          onClick={toggleShowMore}
        >
          {isShowingMore ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
