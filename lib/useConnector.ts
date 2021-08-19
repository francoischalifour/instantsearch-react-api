import {
  Connector,
  WidgetDescription,
  WidgetRenderState,
} from 'instantsearch.js';
import { useEffect, useState } from 'react';
import { useStableValue } from './useStableValue';
import { useIndexContext } from './useIndexContext';
import { usePanelContext } from './usePanelContext';

export function useConnector<
  TProps extends Record<string, unknown>,
  TState extends Omit<WidgetRenderState<any, TProps>, 'widgetParams'>,
  TDescription extends WidgetDescription
>(
  connector: Connector<TDescription, TProps>,
  props: TProps,
  initialState: TState | (() => TState)
) {
  const searchIndex = useIndexContext();
  const panel = usePanelContext();

  const [state, setState] = useState(initialState);
  const stableProps = useStableValue(props);

  useEffect(() => {
    const createWidget = connector((state, isFirstRender) => {
      // We skip the `init` widget render to avoid UI flashes.
      if (isFirstRender) {
        return;
      }

      setState(state);
    });
    const widget = createWidget(stableProps);

    searchIndex.addWidgets([widget]);

    return () => {
      searchIndex.removeWidgets([widget]);
    };
  }, [connector, searchIndex, stableProps]);

  useEffect(() => {
    if (panel) {
      panel.onRenderState(state);
    }
  }, [panel, state]);

  return state;
}
