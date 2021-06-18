import connectConfigure from 'instantsearch.js/cjs/connectors/configure/connectConfigure';
import {
  ConfigureConnectorParams,
  ConfigureRenderState,
} from 'instantsearch.js/es/connectors/configure/connectConfigure';
import { useMemo } from 'react';
import { noop } from './utils/noop';
import { useConnector } from './useConnector';

export function useConfigure(searchParameters: any) {
  const params = useMemo(() => ({ searchParameters }), [searchParameters]);

  return useConnector<ConfigureConnectorParams, ConfigureRenderState>(
    connectConfigure,
    params,
    {
      refine: noop,
    }
  );
}
