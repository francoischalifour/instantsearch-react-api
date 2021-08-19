import { useInstantSearch, UseInstantSearchProps } from './useInstantSearch';
import { IndexContext } from './IndexContext';
import { InstantSearchContext } from './InstantSearchContext';

type InstantSearchProps = UseInstantSearchProps & {
  children: React.ReactNode;
};

export function InstantSearch({ children, ...props }: InstantSearchProps) {
  const search = useInstantSearch(props);

  return (
    <InstantSearchContext.Provider value={search}>
      <IndexContext.Provider value={search.mainIndex}>
        {children}
      </IndexContext.Provider>
    </InstantSearchContext.Provider>
  );
}
