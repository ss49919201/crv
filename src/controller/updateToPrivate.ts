export type updateVisibility = (input: {
  ownerName: string;
  repositoryName: string;
  visibility: "private" | "public";
}) => Promise<void>;

export function updateToPrivate(
  ownerName: string,
  repositoryName: string,
  updateVisibility: updateVisibility
) {
  return updateVisibility({
    ownerName,
    repositoryName,
    visibility: "private",
  });
}
