// Sentence case: "hello world" -> "Hello World"
export function toSentenceCase(input: string): string {
  if (typeof input !== "string" || input.length === 0) {
    return "";
  }

  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

// Title case: "hello world" -> "Hello World"
export function toTitleCase(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
