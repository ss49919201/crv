import { updateToPrivate } from "./controller/updateToPrivate";
import { updateVisibility } from "./service/github";

async function main() {
  await updateToPrivate("", "", updateVisibility);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
