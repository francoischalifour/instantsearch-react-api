import connectCurrentRefinements from 'instantsearch.js/cjs/connectors/current-refinements/connectCurrentRefinements';
import {
  CurrentRefinementsConnectorParams,
  CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { noop } from './utils/noop';
import { useConnector } from './useConnector';

export function useCurrentRefinements(props: any) {
  return useConnector<
    CurrentRefinementsConnectorParams,
    CurrentRefinementsRenderState
  >(connectCurrentRefinements, props, {
    canRefine: false,
    createURL: () => '#',
    items: [],
    refine: noop,
  });
}
