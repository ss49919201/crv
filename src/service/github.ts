import { Octokit } from "octokit";
import z from "zod";
import { debug } from "../debug/debug.js";

const updateVisibilityInputSchema = z.object({
  ownerName: z.string(),
  repositoryName: z.string(),
  visibility: z.union([z.literal("private"), z.literal("public")]),
});

type UpdateVisibilityInput = z.infer<typeof updateVisibilityInputSchema>;

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function updateVisibility(
  input: UpdateVisibilityInput
): Promise<void> {
  await octokit.request("PATCH /repos/{owner}/{repo}", {
    owner: input.ownerName,
    repo: input.repositoryName,
    private: input.visibility === "private",
  });

  debug(
    `Updated visibility of ${input.ownerName}/${input.repositoryName} to ${input.visibility}`
  );
}
