import { useCurrentRefinements } from './useCurrentRefinements';
import { CurrentRefinementsConnectorParams } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

export type CurrentRefinementsProps = CurrentRefinementsConnectorParams;

export function CurrentRefinements(props: CurrentRefinementsProps) {
  const { items } = useCurrentRefinements(props);

  return (
    <div className="ais-CurrentRefinements">
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
