import { getSupportedMediaQueryObject } from './queryRules';
import type {
  QueryMediaValue,
  QueryUnit,
  QueryValueObject,
  UnitTruthStore,
  MediaQueryObject,
  SupportMediaQueryObject,
} from './types';

const nativeMatchMediaExit =
  'matchMedia' in window && typeof window.matchMedia === 'function';

const checkNativeMatchMedia = () => nativeMatchMediaExit;

const getSupportedUnits = (): UnitTruthStore => ({ px: true });

function parseAsQueryObject(value: QueryMediaValue) {
  let nonUnitableObject: boolean | null = null;
  const unitStore = getSupportedUnits();
  if (
    typeof value !== 'string' &&
    (nonUnitableObject =
      'value' in value &&
      typeof value.value === 'number' &&
      'unit' in value &&
      unitStore[value.unit])
  ) {
    return value;
  }

  if (nonUnitableObject !== null) {
    throw new TypeError(
      'An object of unknown type gets passed as a passthrough for a QueryValueObject'
    );
  }

  value = value as string;
  const { pattern, acceptableUnits } = getWorkableUnits(unitStore);
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
  const supportMediaQuery = getSupportedMediaQueryObject();
  Object.getOwnPropertyNames(queryObj).forEach((key) => {
    if (supportMediaQuery[key as keyof SupportMediaQueryObject]) {
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

const getWorkableUnits = (unitObject: UnitTruthStore) => {
  const unitStore = getSupportedUnits();
  const _units = Object.keys(unitObject).filter(
    (unit) => unitStore[unit as keyof UnitTruthStore]
  );
  return {
    pattern: new RegExp(`(${_units.join('|')})$`),
    acceptableUnits: _units,
  };
};

export {
  parseAsQueryObject,
  resolveQueryObject,
  getWorkableUnits,
  checkNativeMatchMedia,
};
