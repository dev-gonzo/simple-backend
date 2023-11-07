export function removeSpecialCharacters(value?: string) {
  if (typeof value === "string") {
    return value.replace(/\D/g, "");
  }
  return "";
}
