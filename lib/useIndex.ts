import index from 'instantsearch.js/cjs/widgets/index/index';
import { useEffect, useMemo } from 'react';
import { useIndexContext } from './useIndexContext';
import { useInstantSearchContext } from './useInstantSearchContext';

export function useIndex(props: any) {
  const searchIndex = useIndexContext();
  const search = useInstantSearchContext();
  const widget = useMemo(() => index(props), [props]);
  const parentIndex = searchIndex ?? search;

  useEffect(() => {
    parentIndex.addWidgets([widget]);

    return () => {
      parentIndex.removeWidgets([widget]);
    };
  }, [parentIndex, props, widget]);

  return widget;
}
