export function isSerializedObject(value: string): boolean {
  if (typeof value !== "string") return false;

  try {
    const parsed = JSON.parse(value);
    return (
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    );
  } catch {
    return false; // Not a valid JSON
  }
}
