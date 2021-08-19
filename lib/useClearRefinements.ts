import connectClearRefinements from 'instantsearch.js/cjs/connectors/clear-refinements/connectClearRefinements';
import {
  ClearRefinementsConnectorParams,
  ClearRefinementsRenderState,
  ClearRefinementsWidgetDescription,
} from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';

import { noop } from './utils/noop';
import { useConnector } from './useConnector';

export function useClearRefinements(props: ClearRefinementsConnectorParams) {
  return useConnector<
    ClearRefinementsConnectorParams,
    ClearRefinementsRenderState,
    ClearRefinementsWidgetDescription
  >(connectClearRefinements, props, () => {
    const canRefine = false;

    return {
      canRefine,
      hasRefinements: canRefine,
      refine: noop,
      createURL: () => '#',
    };
  });
}
