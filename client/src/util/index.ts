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

export { captureUpdateFunctionState };
