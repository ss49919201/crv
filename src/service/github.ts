import { ResultAsync } from "neverthrow";
import { Octokit } from "octokit";
import z, { ZodType } from "zod";
import { debug } from "../debug/debug.js";

type Visibility = "private" | "public";

const updateVisibilityInputSchema = z.object({
  ownerName: z.string().min(1),
  repositoryName: z.string().min(1),
  visibility: z
    .literal("private")
    .or(z.literal("public")) satisfies ZodType<Visibility>,
});

type UpdateVisibilityInput = z.infer<typeof updateVisibilityInputSchema>;

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const errMsg = "Failed to update visibility";
const patchRepositoryEndpoint = "PATCH /repos/{owner}/{repo}";

export function updateVisibility(
  input: UpdateVisibilityInput
): ResultAsync<void, Error> {
  return ResultAsync.fromPromise(
    octokit
      .request(patchRepositoryEndpoint, {
        owner: input.ownerName,
        repo: input.repositoryName,
        private: input.visibility === "private",
      })
      .then(() => {
        debug(
          `Updated visibility of ${input.ownerName}/${input.repositoryName} to ${input.visibility}`
        );
        return Promise.resolve();
      }),
    (error) => {
      if (error instanceof Error) {
        return new Error(`${errMsg}: ${error.message}`);
      }
      return new Error(errMsg);
    }
  );
}
