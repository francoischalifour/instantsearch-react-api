import { useEffect, useState } from 'react';
import { useIndexContext } from './useIndexContext';

export function useConnector<
  TProps extends Record<string, any>,
  TState extends Record<string, any>
>(connector: Function, props: TProps, initialState: TState) {
  const searchIndex = useIndexContext();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const createWidget = connector(setState);
    const hits = createWidget(props);

    searchIndex.addWidgets([hits]);

    return () => {
      searchIndex.removeWidgets([hits]);
    };
  }, [connector, searchIndex, props]);

  return state;
}
