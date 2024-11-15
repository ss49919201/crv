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

if (import.meta.vitest) {
  describe("allSettled", () => {
    it("should return an object with fulfilled and rejected arrays", async () => {
      const promises = [
        Promise.resolve(1),
        Promise.reject("error"),
        Promise.resolve(2),
      ];

      const result = await allSettled(promises);

      expect(result).toEqual({
        fulfilled: [
          { status: "fulfilled", value: 1 },
          { status: "fulfilled", value: 2 },
        ],
        rejected: [{ status: "rejected", reason: "error" }],
      });
    });
  });
}
