import type {
  SupportMediaQueryObject,
  MediaQueryObject,
  MapQueryToObjectValue,
} from './types';
import { parseAsQueryObject, checkNativeMatchMedia } from './util';
import { getSupportedMediaQueryObject } from './queryRules';

const parseQueryObject = (query: string | MediaQueryObject) => {
  if (!checkNativeMatchMedia() || typeof query === 'string') return null;
  const _query = { ...query };
  const supportMediaQuery = getSupportedMediaQueryObject();
  Object.keys(query)
    .filter(function removeNonSupportedQuery(key) {
      return supportMediaQuery[key as keyof SupportMediaQueryObject];
    })
    .forEach((key) => {
      const accessKey = key as keyof MediaQueryObject;
      if (!_query[accessKey]) return;
      _query[accessKey] = parseAsQueryObject(_query[accessKey]!);
    });

  return _query as MapQueryToObjectValue<typeof _query>;
};

export { parseQueryObject };
