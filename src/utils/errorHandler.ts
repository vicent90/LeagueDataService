export function handleError(error: unknown, defaultMessage: string) {
  if (error instanceof Error) {
    throw new Error(`${defaultMessage}: ${error.message}`);
  } else {
    throw new Error(defaultMessage);
  }
}