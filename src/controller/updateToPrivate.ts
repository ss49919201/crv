export type updateVisibility = (input: {
  ownerName: string;
  repositoryName: string;
  visibility: "private" | "public";
}) => Promise<void>;

export async function updateToPrivate(
  ownerName: string,
  repositoryNames: string[],
  updateVisibility: updateVisibility
): Promise<void> {
  const promises = repositoryNames.map((repositoryName) => {
    return updateVisibility({
      ownerName,
      repositoryName,
      visibility: "private",
    }).catch((error) => {
      throw new Error(
        `Failed to update ${repositoryName} to private: ${error.message}`
      );
    });
  });

  await Promise.allSettled(promises).then((values) => {
    values.forEach((value) => {
      if (value.status === "rejected") {
        console.error(value.reason);
      }
    });
  });
}
