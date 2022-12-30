import { useEffect, useState, useMemo } from 'react';

type QueryValueObject = { value: number; unit: QueryUnit };
type QueryMediaValue = string | QueryValueObject;
type MediaQueryObject = {
  'min-width'?: QueryMediaValue;
  'min-height'?: QueryMediaValue;
  'max-height'?: QueryMediaValue;
  'max-width'?: QueryMediaValue;
};

type ScreenDimension = { width: number; height: number };
type MediaQueryEvaluatorFn = (
  value: number
) => (dimension: ScreenDimension) => boolean;

type SupportMediaQueryObject = {
  [K in keyof MediaQueryObject]-?: {
    type: K;
    evaluator: MediaQueryEvaluatorFn;
  };
};

type MapQueryToObjectValue<Q> = Q extends MediaQueryObject
  ? { [K in keyof Q]: QueryValueObject }
  : null;

type QueryUnit = 'px';

const units: Readonly<{ [K in QueryUnit]: boolean }> = { px: true };
const supportNativeMatchMedia =
  'matchMedia' in window && typeof window.matchMedia === 'function';
const getWorkableUnits = (unitObject: typeof units) => {
  const _units = Object.keys(unitObject).filter(
    (unit) => units[unit as keyof typeof units]
  );
  return {
    pattern: new RegExp(`(${_units.join('|')})$`),
    acceptableUnits: _units,
  };
};

const supportedMediaQueryObjectKeys: SupportMediaQueryObject = {
  'min-height': {
    type: 'min-height',
    evaluator:
      (definedHeight) =>
      ({ height }) =>
        height > definedHeight,
  },
  'min-width': {
    type: 'min-width',
    evaluator:
      (defineddWidth) =>
      ({ width }) =>
        width > defineddWidth,
  },
  'max-height': {
    type: 'max-height',
    evaluator:
      (definedHeight) =>
      ({ height }) =>
        height < definedHeight,
  },
  'max-width': {
    type: 'max-width',
    evaluator:
      (definedWidth) =>
      ({ width }) =>
        width < definedWidth,
  },
};

function parseAsQueryObject(value: QueryMediaValue) {
  let nonUnitableObject: boolean | null = null;
  if (
    typeof value !== 'string' &&
    (nonUnitableObject =
      'value' in value &&
      typeof value.value === 'number' &&
      'unit' in value &&
      units[value.unit])
  ) {
    return value;
  }

  if (nonUnitableObject !== null) {
    throw new TypeError(
      'An object of unknown type gets passed as a passthrough for a QueryValueObject'
    );
  }

  value = value as string;
  const { pattern, acceptableUnits } = getWorkableUnits(units);
  const unitMatch = value.match(pattern);
  if (!unitMatch) {
    throw new TypeError(
      'Caught an invalid unit type while parsing string. expected' +
        `[${acceptableUnits.join('|')}] but got string with ${value}`
    );
  }

  const queryObject: QueryValueObject = {
    value: +value.slice(0, unitMatch.index),
    unit: value.slice(unitMatch.index) as QueryUnit,
  };

  if (!Number.isFinite(queryObject.value)) {
    throw new TypeError(
      'Invalid sizedValue found while parsing the string as QueryValueObject, expected [number]' +
        `[${acceptableUnits.join('|')}]`
    );
  }

  return queryObject;
}

function resolveQueryObject(queryObj: MediaQueryObject) {
  let interpretableQuery = '';
  Object.getOwnPropertyNames(queryObj).forEach((key) => {
    if (supportedMediaQueryObjectKeys[key as keyof SupportMediaQueryObject]) {
      const query = queryObj[key as keyof MediaQueryObject]!;
      let parsedQuery = query;
      if (typeof parsedQuery !== 'string') {
        parsedQuery = `${parsedQuery.value}${parsedQuery.unit}`;
      }
      parsedQuery = `(${key}:${parsedQuery})`;

      interpretableQuery += `${
        interpretableQuery ? ' and ' : ''
      }${parsedQuery}`;
    }
  });

  return interpretableQuery;
}

const useParsedMediaQueryObject = (query: string | MediaQueryObject) =>
  useMemo(() => {
    if (!supportNativeMatchMedia || typeof query === 'string') return null;
    const _query = { ...query };
    Object.keys(query)
      .filter(function removeNonSupportedQuery(key) {
        return supportedMediaQueryObjectKeys[
          key as keyof SupportMediaQueryObject
        ];
      })
      .forEach((key) => {
        const accessKey = key as keyof MediaQueryObject;
        if (!_query[accessKey]) return;
        _query[accessKey] = parseAsQueryObject(_query[accessKey]!);
      });

    return _query as MapQueryToObjectValue<typeof _query>;
  }, []);

interface UseMediaQueryOption {
  attachElement?: HTMLElement;
}

const useMediaQuery = (
  query: string | MediaQueryObject,
  option?: UseMediaQueryOption
) => {
  const [matches, setMatches] = useState(false);

  let attachElementProvided = false;
  if (
    (!supportNativeMatchMedia ||
      (attachElementProvided = !!(option && option.attachElement))) &&
    typeof query === 'string'
  ) {
    if (!attachElementProvided) {
      throw new Error(
        'Parsing of media query as string instruction is not natively supported for this browser version platform\n' +
          'consider updating your browser or use the query object.'
      );
    }

    throw new Error(
      'using attachElement in the option object is not supported with string query.\n' +
        'inorder to resolve this issue use the query object'
    );
  }

  const parsedQueryObject = useParsedMediaQueryObject(query);
  useEffect(() => {
    let unsubscribe!: () => void;

    const resolvedQueryValue =
      typeof query !== 'string' ? resolveQueryObject(query) : query;

    if (!attachElementProvided && supportNativeMatchMedia) {
      const mediaQuery = window.matchMedia(resolvedQueryValue);

      if (mediaQuery.matches !== matches) setMatches(mediaQuery.matches);
      const onQueryMatch = (event: MediaQueryListEvent) =>
        setMatches(event.matches);

      mediaQuery.addEventListener('change', onQueryMatch);

      unsubscribe = () =>
        mediaQuery.removeEventListener('change', onQueryMatch);
    } else {
      if (!parsedQueryObject) {
        throw new Error(
          'An internal error as occurred.This error is not meant to be observed outside of this hook' +
            '\n file for a bug issue if detected.'
        );
      }

      function setQueryMatch(
        dimension: ScreenDimension,
        parsedQuery: MapQueryToObjectValue<MediaQueryObject>
      ) {
        type SupportMediaKeys = Array<keyof SupportMediaQueryObject>;
        const queryKeys = Object.keys(parsedQuery) as SupportMediaKeys;

        let newMatchDetected = queryKeys.length !== 0;
        queryKeys.forEach((key) => {
          const queryParserObject = supportedMediaQueryObjectKeys[key];
          newMatchDetected =
            newMatchDetected &&
            queryParserObject.evaluator(parsedQuery[key]!.value)(dimension);
        });

        setMatches(newMatchDetected);
      }

      const observingElement = attachElementProvided
        ? option?.attachElement!
        : document.documentElement;

      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(([entry]) => {
          if (entry.target === observingElement) {
            setQueryMatch(entry.contentRect, parsedQueryObject);
          }
        });
        resizeObserver.observe(observingElement);
        unsubscribe = () => resizeObserver.unobserve(observingElement);
      } else {
        function onPageResize({ target }: Event) {
          if (target !== observingElement) return;
          const { width, height } = (
            target as HTMLElement
          ).getBoundingClientRect();

          setQueryMatch({ width, height }, parsedQueryObject!);
        }
        observingElement.addEventListener('resize', onPageResize);
        unsubscribe = () =>
          observingElement.removeEventListener('resize', onPageResize);
      }
    }

    return unsubscribe;
  }, [query]);
  return matches;
};

export { useMediaQuery, supportNativeMatchMedia };
