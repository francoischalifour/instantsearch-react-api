import { HierarchicalMenuConnectorParams } from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu';
import { Menu } from './Menu';
import { useHierarchicalMenu } from './useHierarchicalMenu';

export type HierarchicalMenuProps = HierarchicalMenuConnectorParams &
  React.ComponentProps<'div'>;

export function HierarchicalMenu(props: HierarchicalMenuProps) {
  // const widgetParams = useHierarchicalMenu(props)

  // @TODO: create HierarchicalMenu component
  return <Menu attribute={props.attributes[0]} {...props} />;
}
