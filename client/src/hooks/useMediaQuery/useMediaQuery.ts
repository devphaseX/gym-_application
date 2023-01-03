import { useState } from 'react';
import { QueryOption, QueryRule } from './core/types';
import { createParseQuery, createQueryObserver } from './core/mediaQuery';
import { stringifiedObject } from '../../util';
import { useEffect } from 'react';

const useQueryMedia = (query: QueryRule, option: Partial<QueryOption>) => {
  const parseQuery = createParseQuery(query);
  const [matches, setMatches] = useState(
    !parseQuery || Object.keys(parseQuery).length !== 0
  );

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
      onChange(previousMatches, currentMatches) {
        option?.onChange?.(previousMatches, currentMatches);
        setMatches(currentMatches);
      },
    });
  }, depArray);

  return matches;
};

export { useQueryMedia };
