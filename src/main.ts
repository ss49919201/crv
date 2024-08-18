import { program } from "commander";
import { updateToPrivate } from "./controller/updateToPrivate.js";
import { updateVisibility } from "./service/github.js";

function main() {
  program
    .command("private")
    .argument("<repo>")
    .argument("<owner>")
    .action(async (repo, owner) => {
      await updateToPrivate(repo, owner, updateVisibility);
    });

  program.parse();
}

main();
