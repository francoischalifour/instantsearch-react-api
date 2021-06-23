import index from 'instantsearch.js/cjs/widgets/index/index';
import { useEffect, useMemo } from 'react';
import { useIndexContext } from './useIndexContext';

type IndexWidgetParams = {
  indexName: string;
  indexId?: string;
};

export function useIndex(props: IndexWidgetParams) {
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
