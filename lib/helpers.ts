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

export function getImageUrlForRelease(type: string, id: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/${type}/${id}.webp`;
}
