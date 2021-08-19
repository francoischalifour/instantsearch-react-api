import connectConfigure from 'instantsearch.js/cjs/connectors/configure/connectConfigure';
import {
  ConfigureConnectorParams,
  ConfigureRenderState,
  ConfigureWidgetDescription,
} from 'instantsearch.js/es/connectors/configure/connectConfigure';
import { useMemo } from 'react';
import { noop } from './utils/noop';
import { useConnector } from './useConnector';

export function useConfigure(
  searchParameters: ConfigureConnectorParams['searchParameters']
) {
  const params = useMemo(() => ({ searchParameters }), [searchParameters]);

  return useConnector<
    ConfigureConnectorParams,
    ConfigureRenderState,
    ConfigureWidgetDescription
  >(connectConfigure, params, {
    refine: noop,
  });
}
