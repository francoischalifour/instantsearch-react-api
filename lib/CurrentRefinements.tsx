import { useCurrentRefinements } from './useCurrentRefinements';
import { CurrentRefinementsConnectorParams } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { cx } from './utils';

export type CurrentRefinementsProps = CurrentRefinementsConnectorParams &
  React.ComponentProps<'div'>;

export function CurrentRefinements(props: CurrentRefinementsProps) {
  const { items } = useCurrentRefinements(props);

  return (
    <div className={cx('ais-CurrentRefinements', props.className)}>
      <ul className="ais-CurrentRefinements-list">
        {items.map((item) => (
          <li key={item.attribute} className="ais-CurrentRefinements-item">
            <span className="ais-CurrentRefinements-label">{item.label}:</span>
            {item.refinements.map((refinement) => (
              <span
                key={refinement.value}
                className="ais-CurrentRefinements-category"
              >
                <span className="ais-CurrentRefinements-categoryLabel">
                  {refinement.label}
                </span>
                <button
                  className="ais-CurrentRefinements-delete"
                  onClick={() => {
                    item.refine(refinement);
                  }}
                >
                  ✕
                </button>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
