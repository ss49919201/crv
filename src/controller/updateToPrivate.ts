import { ResultAsync } from "neverthrow";

export type updateVisibility = (input: {
  ownerName: string;
  repositoryName: string;
  visibility: "private" | "public";
}) => ResultAsync<void, Error>;

export function updateToPrivate(
  ownerName: string,
  repositoryNames: string[],
  updateVisibility: updateVisibility
): ResultAsync<
  {
    repositoryNames: string[];
  },
  Error
> {
  const promises = repositoryNames.map((repositoryName) => {
    return updateVisibility({
      ownerName,
      repositoryName,
      visibility: "private",
    }).match(
      () => {
        // Noop
        return repositoryName;
      },
      (error) => {
        throw new Error(
          `Failed to update ${repositoryName} to private: ${error.message}`
        );
      }
    );
  });

  return ResultAsync.fromPromise(
    Promise.allSettled(promises).then((values) => {
      const results: string[] = [];

      values.forEach((value) => {
        switch (value.status) {
          case "rejected":
            console.error(value.reason);
            break;
          case "fulfilled":
            results.push(value.value);
            break;
        }
      });

      return { repositoryNames: results };
    }),
    () => new Error("Failed to update repositories to private")
  );
}
