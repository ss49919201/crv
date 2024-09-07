import { program } from "commander";
import { updateToPrivate } from "./controller/updateToPrivate.js";
import { updateVisibility } from "./service/github.js";

function main() {
  program
    .command("private")
    .argument("<repos>")
    .argument("<owner>")
    .action(async (repos, owner) => {
      if (typeof repos !== "string") {
        throw new Error("Invalid argument: repos");
      }

      const reposArray = repos.split(",");

      if (typeof owner !== "string") {
        throw new Error("Invalid argument: owner");
      }

      const output = await updateToPrivate(owner, reposArray, updateVisibility);
      if (output.isOk()) {
        console.log("Done!🎉");
        console.log(
          "Success repositories: ",
          output.value.repositoryNames.join(", ")
        );
      }
    });

  program.parse();
}

main();
