import { Widget } from 'instantsearch.js';
import { IndexWidget } from 'instantsearch.js/es/widgets/index/index';

export function isIndexWidget(
  widget: Widget | IndexWidget
): widget is IndexWidget {
  return widget.$$type === 'ais.index';
}
