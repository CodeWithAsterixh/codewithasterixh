export function ellipsisMiddle(
  str: string,
  maxCount = 7,
  mode: "char" | "word" = "char"
): string {
  if (mode === "word") {
    // Split on whitespace, filter out any empty tokens
    const words = str.split(/\s+/).filter(Boolean);
    // If there aren’t more words than we need to truncate, return original
    if (words.length <= maxCount * 2) {
      return str;
    }
    const start = words.slice(0, maxCount).join(" ");
    const end = words.slice(words.length - maxCount).join(" ");
    return `${start}…${end}`;
  } else {
    // Character-based truncation
    if (str.length <= maxCount * 2) {
      return str;
    }
    const start = str.slice(0, maxCount);
    const end = str.slice(str.length - maxCount);
    return `${start}…${end}`;
  }
}

export function initialLetters(
  str: string,
  amount = 1,
  type: "uppercase" | "lowercase" = "uppercase"
): string {
  if (!str) return "";
  const letters = str.split(" ").map((word) => word.charAt(0));
  const initials = letters.slice(0, amount).join("");

  if (type === "lowercase") return initials.toLowerCase();
  return initials.toUpperCase();
}
