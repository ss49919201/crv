type AllSettledResult<T> = {
  fulfilled: PromiseFulfilledResult<T>[];
  rejected: PromiseRejectedResult[];
};

export const allSettled = async <T>(promises: Promise<T>[]) => {
  return Promise.allSettled(promises).then((results) => {
    return results.reduce(
      (accumulator: AllSettledResult<T>, current) => {
        return {
          fulfilled: [
            ...accumulator.fulfilled,
            ...(current.status === "fulfilled" ? [current] : []),
          ],
          rejected: [
            ...accumulator.rejected,
            ...(current.status === "rejected" ? [current] : []),
          ],
        };
      },
      {
        fulfilled: [],
        rejected: [],
      }
    );
  });
};
