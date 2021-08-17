import { useEffect, useState } from 'react';
import { useIndexContext } from './useIndexContext';
import { usePanelContext } from './usePanelContext';

export function useConnector<
  TProps extends Record<string, any>,
  TState extends Record<string, any>
>(connector: Function, props: TProps, initialState: TState) {
  const searchIndex = useIndexContext();
  const panel = usePanelContext();
  const [state, setState] = useState(() => initialState);

  useEffect(() => {
    const createWidget = connector(setState);
    const widget = createWidget(props);

    searchIndex.addWidgets([widget]);

    return () => {
      searchIndex.removeWidgets([widget]);
    };
  }, [connector, searchIndex, props]);

  useEffect(() => {
    if (panel) {
      panel.onRenderState(state);
    }
  }, [panel, state]);

  return state;
}
