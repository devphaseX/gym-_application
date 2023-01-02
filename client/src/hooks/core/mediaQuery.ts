import {
  QueryRule,
  QueryRuleWithObjectQuery,
  QueryOption,
  ScreenDimension,
  SupportMediaQueryObject,
} from './types';
import { checkNativeMatchMedia, resolveQueryObject } from './util';
import { stringifiedObject } from '../../util';
import { parseQueryObject } from './parser';
import { getSupportedMediaQueryObject } from './queryRules';

const parsedQueryCache = new Map<string, QueryRuleWithObjectQuery>();
function createQueryObserver(query: QueryRule, option: QueryOption) {
  let attachElementProvided = false;
  const nativeMatchMediaExit = checkNativeMatchMedia();
  if (
    !nativeMatchMediaExit ||
    ((attachElementProvided = !!option.attachElement) &&
      typeof query === 'string')
  ) {
    if (!attachElementProvided) {
      throw new Error(
        'Parsing of media query as string instruction is not natively supported for this browser version platform\n' +
          'consider updating your browser or use the query object.'
      );
    }

    throw new Error(
      'Parsing of media query as string instruction is not natively supported for this browser version platform\n' +
        'consider updating your browser or use the query object.'
    );
  }

  const parsedQuery = createParseQuery(query);

  if (parsedQuery) option.exposeParsedQuery?.(parsedQuery);

  let matches = false;
  const abort = new AbortController();
  let unsubscribe = () => abort.abort();

  const resolvedQueryValue =
    typeof query !== 'string' ? resolveQueryObject(query) : query;

  if (!attachElementProvided && nativeMatchMediaExit) {
    const mediaQuery = window.matchMedia(resolvedQueryValue);

    matches = mediaQuery.matches;
    option.onChange(false, matches);
    const onQueryMatch = (event: MediaQueryListEvent) => {
      const currentMatch = event.matches;
      if (currentMatch === matches) return;
      option.onChange(matches, currentMatch);
      matches = currentMatch;
    };

    mediaQuery.addEventListener('change', onQueryMatch, {
      signal: abort.signal,
    });
  } else {
    if (!parsedQuery) {
      throw new Error(
        'An internal error as occurred.This error is not meant to be observed outside of this hook' +
          '\n file for a bug issue if detected.'
      );
    }

    function setQueryMatch(
      dimension: ScreenDimension,
      parsedQuery: QueryRuleWithObjectQuery
    ) {
      type SupportMediaKeys = Array<keyof SupportMediaQueryObject>;
      const queryKeys = Object.keys(parsedQuery) as SupportMediaKeys;

      let newMatchDetected = queryKeys.length !== 0;
      const supportQuery = getSupportedMediaQueryObject();
      queryKeys.forEach((key) => {
        const queryParserObject = supportQuery[key];
        newMatchDetected =
          newMatchDetected &&
          queryParserObject.evaluator(parsedQuery[key]!.value)(dimension);
      });

      if (newMatchDetected !== matches) {
        option.onChange(matches, newMatchDetected);
        matches = newMatchDetected;
      }
    }

    const observingElement = attachElementProvided
      ? option?.attachElement!
      : document.documentElement;

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        if (entry.target === observingElement) {
          setQueryMatch(entry.contentRect, parsedQuery);
        }
      });
      resizeObserver.observe(observingElement);
      abort.signal.onabort = () => resizeObserver.unobserve(observingElement);
    } else {
      function onPageResize({ target }: Event) {
        if (target !== observingElement) return;
        const { width, height } = (
          target as HTMLElement
        ).getBoundingClientRect();

        setQueryMatch({ width, height }, parsedQuery!);
      }
      observingElement.addEventListener('resize', onPageResize, {
        signal: abort.signal,
      });
    }

    setQueryMatch(
      document.documentElement.getBoundingClientRect(),
      parsedQuery
    );
  }

  return unsubscribe;
}

function createParseQuery(query: QueryRule) {
  const key = JSON.stringify(query, stringifiedObject);
  if (parsedQueryCache.has(key)) return parsedQueryCache.get(key)!;
  const parsedQuery = parseQueryObject(query);
  if (parsedQuery === null) return parsedQuery;
  parsedQueryCache.set(key, parsedQuery);
  return parsedQuery;
}

export { createQueryObserver, createParseQuery };
