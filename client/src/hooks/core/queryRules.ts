import { SupportMediaQueryObject } from './types';

const getSupportedMediaQueryObject = (): SupportMediaQueryObject => ({
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
});

export { getSupportedMediaQueryObject };
