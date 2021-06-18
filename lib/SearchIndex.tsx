import { IndexContext } from './IndexContext';
import { useIndex } from './useIndex';

export function Index(props: any) {
  const index = useIndex(props);

  return (
    <IndexContext.Provider value={index}>
      {props.children}
    </IndexContext.Provider>
  );
}
