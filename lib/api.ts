import { supabase } from "@/lib/supabaseClient";
import { CommonIntIdModel } from "./models/common.model";
import { dbReleasesSchema } from "./models/db";
import { ReleaseItemModel, ReleasesModel } from "./models/releases.model";

export async function getReleases({
  pageSize = 30,
  cursorId = 1,
  keyword = "",
  isAscending = false,
  filters = {},
}: {
  pageSize?: number;
  cursorId?: CommonIntIdModel;
  keyword?: string;
  sortBy?: string;
  isAscending?: boolean;
  filters?: Record<string, string | number | null>;
}) {
  let query = supabase
    .from("releases")
    .select(
      `
        id,
        created_at,
        title,
        release_date,
        wiki_tag,
        is_licensed,
        market_tag:market_id (tag),
        platform_name:platform_id (name),
        publisher_name:publisher_id (name),
        market_id
      `,
    )
    .order("created_at", { ascending: isAscending })
    .limit(pageSize);

  if (cursorId) {
    query.lte("id", cursorId);
  }

  if (keyword && keyword.length > 0) {
    query.ilike("title", `%${keyword}%`);
  }

  // Apply Filters Dynamically
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      query = query.eq(key, value); // Exact match filtering
    }
  });

  // Execute query
  const { data, count, error } = await query;
  if (error) throw new Error("Supabase error: ", error);

  // Validate and transform data
  const parsedData = await dbReleasesSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Invalid data format from Supabase");

  const transformedData: ReleasesModel = parsedData.data.map((release) => ({
    id: release.id,
    created_at: release.created_at,
    title: release.title,
    release_date: release.release_date ?? undefined,
    is_licensed: release.is_licensed ?? undefined,
    platform_name: release.platform_name?.name ?? undefined,
    publisher_name: release.publisher_name?.name ?? undefined,
    market_tag: release.market_tag?.tag ?? undefined,
  }));

  return { releases: transformedData, total: count ?? 0 };
}

export async function getPaginationCursors(pageSize: number, keyword?: string) {
  const { data, error } = await supabase.rpc("fetch_cursor_keys", {
    keyword: keyword ?? "",
    page_size: pageSize,
  });

  if (error) {
    console.error("Error fetching pagination cursors:", error);
    return [];
  }

  return data.map((item: ReleaseItemModel) => item.id); // Returns an array of IDs
}
