import { HighlightResult } from '@algolia/client-search';
import { createElement, Fragment } from 'react';

export type HighlightHitParams<THit> = {
  /**
   * The Algolia hit whose attribute to retrieve the highlighted parts from.
   */
  hit: THit;
  /**
   * The attribute to retrieve the highlighted parts from.
   *
   * You can use the array syntax to reference nested attributes.
   */
  attribute: keyof THit | string[];
  /**
   * The tag name to use for highlighted parts.
   *
   * @default "mark"
   */
  tagName?: string;
  highlightPreTag?: string;
  highlightPostTag?: string;
};

export function Highlight<THit>({
  hit,
  attribute,
  tagName = 'mark',
  highlightPreTag = '<mark>',
  highlightPostTag = '</mark>',
}: HighlightHitParams<THit>): JSX.Element {
  return createElement(
    Fragment,
    {},
    parseAlgoliaHitHighlight<THit>({
      hit,
      attribute,
      highlightPreTag,
      highlightPostTag,
    }).map((x, index) =>
      x.isHighlighted
        ? createElement(tagName, { key: index }, x.value)
        : x.value
    )
  );
}

type ParsedAttribute = {
  value: string;
  isHighlighted: boolean;
};

/**
 * Creates a data structure that allows to concatenate similar highlighting
 * parts in a single value.
 */
function createAttributeSet(initialValue: ParsedAttribute[] = []) {
  const value = initialValue;

  return {
    get() {
      return value;
    },
    add(part: ParsedAttribute) {
      const lastPart: ParsedAttribute | undefined = value[value.length - 1];

      if (lastPart?.isHighlighted === part.isHighlighted) {
        value[value.length - 1] = {
          value: lastPart.value + part.value,
          isHighlighted: lastPart.isHighlighted,
        };
      } else {
        value.push(part);
      }
    },
  };
}

type ParseAttributeParams = {
  highlightedValue: string;
  highlightPreTag: string;
  highlightPostTag: string;
};

export function parseAttribute({
  highlightedValue,
  highlightPreTag,
  highlightPostTag,
}: ParseAttributeParams): ParsedAttribute[] {
  const preTagParts = highlightedValue.split(highlightPreTag);
  const firstValue = preTagParts.shift();
  const parts = createAttributeSet(
    firstValue ? [{ value: firstValue, isHighlighted: false }] : []
  );

  preTagParts.forEach((part) => {
    const postTagParts = part.split(highlightPostTag);

    parts.add({
      value: postTagParts[0],
      isHighlighted: true,
    });

    if (postTagParts[1] !== '') {
      parts.add({
        value: postTagParts[1],
        isHighlighted: false,
      });
    }
  });

  return parts.get();
}

function getAttributeValueByPath<TRecord>(
  record: TRecord,
  path: string[]
): any {
  return path.reduce((current, key) => current && current[key], record);
}

type HighlightedHit<THit> = THit & {
  _highlightResult?: HighlightResult<THit>;
};

type ParseAlgoliaHitParams<TItem> = {
  hit: TItem;
  attribute: keyof TItem | string[];
  highlightPreTag: string;
  highlightPostTag: string;
};

function parseAlgoliaHitHighlight<THit extends HighlightedHit<unknown>>({
  hit,
  attribute,
  highlightPreTag,
  highlightPostTag,
}: ParseAlgoliaHitParams<THit>): ParsedAttribute[] {
  const path = Array.isArray(attribute) ? attribute : ([attribute] as string[]);
  let highlightedValue = getAttributeValueByPath(hit, [
    '_highlightResult',
    ...path,
    'value',
  ]);

  if (typeof highlightedValue !== 'string') {
    console.warn(
      false,
      `The attribute "${path.join('.')}" described by the path ${JSON.stringify(
        path
      )} does not exist on the hit. Did you set it in \`attributesToHighlight\`?` +
        '\nSee https://www.algolia.com/doc/api-reference/api-parameters/attributesToHighlight/'
    );

    highlightedValue = getAttributeValueByPath(hit, path) || '';
  }

  return parseAttribute({
    highlightedValue,
    highlightPreTag,
    highlightPostTag,
  });
}
