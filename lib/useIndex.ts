import index from 'instantsearch.js/cjs/widgets/index/index';
import { useEffect, useMemo } from 'react';
import { useIndexContext } from './useIndexContext';

export function useIndex(props: any) {
  const searchIndex = useIndexContext();
  const widget = useMemo(() => index(props), [props]);

  useEffect(() => {
    searchIndex.addWidgets([widget]);

    return () => {
      searchIndex.removeWidgets([widget]);
    };
  }, [searchIndex, widget]);

  return widget;
}
