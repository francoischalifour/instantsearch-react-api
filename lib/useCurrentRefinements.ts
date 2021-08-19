import connectCurrentRefinements from 'instantsearch.js/cjs/connectors/current-refinements/connectCurrentRefinements';
import {
  CurrentRefinementsConnectorParams,
  CurrentRefinementsRenderState,
  CurrentRefinementsWidgetDescription,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { noop } from './utils/noop';
import { useConnector } from './useConnector';

export function useCurrentRefinements(
  props: CurrentRefinementsConnectorParams
) {
  return useConnector<
    CurrentRefinementsConnectorParams,
    CurrentRefinementsRenderState,
    CurrentRefinementsWidgetDescription
  >(connectCurrentRefinements, props, {
    canRefine: false,
    createURL: () => '#',
    // @TODO get the initial items from InstantSearch.js
    // See https://github.com/algolia/instantsearch.js/blob/413c2db34cf19d2419d04a4db1a8837ce19a7d73/src/connectors/current-refinements/connectCurrentRefinements.ts#L219-L245
    items: [],
    refine: noop,
  });
}
