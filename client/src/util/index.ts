type UpdateFunction<T> = (oldState: T) => T;

type StateUpdater<T> = (update: UpdateFunction<T>) => void;

function captureUpdateFunctionState<T>(update: StateUpdater<T>) {
  return new Promise<T>((res) => {
    update((currentState) => {
      res(currentState);
      return currentState;
    });
  });
}

function stringifiedObject(_: string, value: any) {
  if (
    typeof value === 'function' ||
    typeof value === 'symbol' ||
    value === undefined ||
    value === undefined
  ) {
    return undefined;
  }

  if (typeof value === 'bigint') return `[{bigInt}:{${value.toString()}}]`;
  return value;
}

function createHashTag(value: string, omitHash?: boolean) {
  return `${value.startsWith('#') || omitHash ? '' : '#'}${value
    .toString()
    .replace(/\s/g, '')}`;
}

function getBoundClientRect(element: HTMLElement) {
  return element.getBoundingClientRect();
}

export {
  captureUpdateFunctionState,
  stringifiedObject,
  createHashTag,
  getBoundClientRect,
};
