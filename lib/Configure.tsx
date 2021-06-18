import { ConfigureConnectorParams } from 'instantsearch.js/es/connectors/configure/connectConfigure';
import { useConfigure } from './useConfigure';

export function Configure(props: ConfigureConnectorParams['searchParameters']) {
  useConfigure(props);

  return null;
}
