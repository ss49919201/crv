import { Logger } from "tslog";

const logger = new Logger();

export function debug(msg: string): void {
  if (process.env.DEBUG === "true") logger.debug(msg);
}
