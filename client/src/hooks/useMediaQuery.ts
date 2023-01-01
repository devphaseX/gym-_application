import { useState } from 'react';
import { QueryOption, QueryRule } from './core/types';
import { createParsedQueryCache, createQueryObserver } from './core/mediaQuery';
import { stringifiedObject } from '../util';
import { useEffect } from 'react';

const useQueryMedia = (query: QueryRule, option: QueryOption) => {
  const [matches, setMatches] = useState(false);
  const parseQuery = createParsedQueryCache(query);

  const depArray = [
    ...((typeof query === 'string' ? [query] : []) as any[]),
    ...[
      JSON.stringify(parseQuery, stringifiedObject),
      option?.attachElement,
      option?.onChange,
    ],
  ];

  useEffect(() => {
    return createQueryObserver(query, {
      onChange(_, currentMatches) {
        setMatches(currentMatches);
      },
    });
  }, depArray);

  return matches;
};

export { useQueryMedia };
