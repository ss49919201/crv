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
