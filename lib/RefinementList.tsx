import { RefinementListConnectorParams } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { useRefinementList } from './useRefinementList';
import { PanelWrapper } from './PanelWrapper';
import { cx } from './utils';

export type RefinementListProps = RefinementListConnectorParams & {
  showMore?: boolean;
};

export function RefinementList(props: RefinementListProps) {
  const {
    refine,
    items,
    canRefine,
    canToggleShowMore,
    toggleShowMore,
    isShowingMore,
  } = useRefinementList(props);

  return (
    <PanelWrapper canRefine={canRefine}>
      <div className="ais-RefinementList">
        <ul className="ais-RefinementList-list">
          {items.map((item) => (
            <li
              key={item.value}
              className={cx(
                'ais-RefinementList-item',
                item.isRefined && 'ais-RefinementList-item--selected'
              )}
            >
              <label className="ais-RefinementList-label">
                <input
                  className="ais-RefinementList-checkbox"
                  type="checkbox"
                  value={item.value}
                  checked={item.isRefined}
                  onChange={() => {
                    refine(item.value);
                  }}
                />
                <span className="ais-RefinementList-labelText">
                  {item.label}
                </span>
                <span className="ais-RefinementList-count">{item.count}</span>
              </label>
            </li>
          ))}
        </ul>

        {props.showMore && (
          <button
            className={cx(
              'ais-RefinementList-showMore',
              !canToggleShowMore && 'ais-RefinementList-showMore--disabled'
            )}
            disabled={!canToggleShowMore}
            onClick={toggleShowMore}
          >
            {isShowingMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </PanelWrapper>
  );
}
