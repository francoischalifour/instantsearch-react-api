import { useHits } from './useHits';
import { HitsConnectorParams } from 'instantsearch.js/es/connectors/hits/connectHits';
import { cx } from './utils';

export type HitsProps = HitsConnectorParams &
  React.ComponentProps<'div'> & {
    hitComponent(params: { hit: object }): JSX.Element;
  };

export function Hits(props: HitsProps) {
  const { hits } = useHits(props);

  return (
    <div className={cx('ais-Hits', props.className)}>
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <props.hitComponent hit={hit} />
          </li>
        ))}
      </ol>
    </div>
  );
}
