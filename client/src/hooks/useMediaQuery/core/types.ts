interface QueryValueObject {
  value: number;
  unit: QueryUnit;
}

type QueryMediaValue = string | QueryValueObject;

interface MediaQueryObject {
  'min-width'?: QueryMediaValue;
  'min-height'?: QueryMediaValue;
  'max-height'?: QueryMediaValue;
  'max-width'?: QueryMediaValue;
}

interface ScreenDimension {
  width: number;
  height: number;
}
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

interface QueryOption {
  attachElement?: HTMLElement;
  onChange: (prevMatches: boolean, currentMatches: boolean) => void;
  exposeParsedQuery?: (query: QueryRuleWithObjectQuery) => void;
}

interface QueryRuleWithObjectQuery
  extends MapQueryToObjectValue<MediaQueryObject> {}
type QueryUnit = 'px';
type UnitTruthStore = Readonly<{ [K in QueryUnit]: boolean }>;

type QueryRule = string | MediaQueryObject;

export type {
  QueryOption,
  QueryRuleWithObjectQuery,
  QueryRule,
  UnitTruthStore,
  QueryMediaValue,
  QueryValueObject,
  SupportMediaQueryObject,
  MapQueryToObjectValue,
  MediaQueryObject,
  QueryUnit,
  ScreenDimension,
};
