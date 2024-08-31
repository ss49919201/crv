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
): ResultAsync<void, Error> {
  const promises = repositoryNames.map((repositoryName) => {
    return updateVisibility({
      ownerName,
      repositoryName,
      visibility: "private",
    }).match(
      () => {
        // Noop
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
      values.forEach((value) => {
        if (value.status === "rejected") {
          console.error(value.reason);
        }
      });
    }),
    () => new Error("Failed to update repositories to private")
  );
}
