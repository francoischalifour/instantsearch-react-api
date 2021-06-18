import { InstantSearchOptions } from 'instantsearch.js';

import { useInstantSearch } from './useInstantSearch';
import { IndexContext } from './IndexContext';
import { InstantSearchContext } from './InstantSearchContext';

type InstantSearchProps = InstantSearchOptions & {
  children: React.ReactNode;
};

export function InstantSearch(props: InstantSearchProps) {
  const search = useInstantSearch(props);

  return (
    <InstantSearchContext.Provider value={search}>
      <IndexContext.Provider value={search.mainIndex}>
        {props.children}
      </IndexContext.Provider>
    </InstantSearchContext.Provider>
  );
}
