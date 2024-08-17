export function debug(msg: string): void {
  if (process.env.DEBUG === "true") console.debug(msg);
}
