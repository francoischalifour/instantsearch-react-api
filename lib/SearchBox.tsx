import { SearchBoxConnectorParams } from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchBox } from './useSearchBox';
import { SearchBox as SearchBoxComponent } from './components/SearchBox';

export type SearchBoxProps = SearchBoxConnectorParams & {
  placeholder?: string;
};

export function SearchBox(props: SearchBoxProps) {
  const { query, refine, isSearchStalled } = useSearchBox(props);
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function onReset() {
    setValue('');
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  useEffect(() => {
    refine(value);
  }, [refine, value]);

  return (
    <SearchBoxComponent
      inputRef={inputRef}
      isSearchStalled={isSearchStalled}
      onChange={onChange}
      onReset={onReset}
      placeholder={props.placeholder}
      value={value}
    />
  );
}
