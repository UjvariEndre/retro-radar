import { supabase } from "@/lib/supabaseClient";

export async function getReleases({
  page = 1,
  pageSize = 10,
  sortBy = "created_at",
  sortOrder = "desc",
  filters = {},
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, string | number | null>;
}) {
  const offset = (page - 1) * pageSize;
  let query = supabase
    .from("releases")
    .select("*", { count: "exact" })
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range(offset, offset + pageSize - 1);

  // Apply Filters Dynamically
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      query = query.eq(key, value); // Exact match filtering
    }
  });

  const { data, count, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return { releases: [], total: 0 };
  }

  return { releases: data, total: count };
}
