import { supabase } from "@/lib/supabaseClient";
import { dbReleasesSchema } from "./models/db";
import { PublishersModel, PublishersSchema } from "./models/publishers.model";
import { ReleasesModel } from "./models/releases.model";

export async function getReleases({
  pageSize = 30,
  pageIndex = 0,
  keyword = "",
  publisherId,
  platformId,
  regionId,
  isLicensed,
  dateRange,
  isAscending = false,
}: {
  pageSize?: number;
  pageIndex?: number;
  keyword?: string;
  publisherId?: number | null;
  platformId?: number | null;
  regionId?: number | null;
  isLicensed?: boolean | null;
  dateRange?: {
    dateFrom: string | undefined;
    dateTo: string | undefined;
  } | null;
  sortBy?: string;
  isAscending?: boolean;
}) {
  const query = supabase
    .from("releases")
    .select(
      `
      id,
      created_at,
      title,
      release_date,
      wiki_tag,
      is_licensed,
      publisher_id,
      publisher_name:publisher_id (name),
      region_id,
      region_tag:region_id (tag),
      platform_id,
      platform_name:platform_id (name)
    `,
    )
    .order("created_at", { ascending: isAscending })
    .range(pageIndex * pageSize, pageIndex * pageSize + pageSize - 1);
  if (keyword && keyword.length > 0) query.ilike("title", `%${keyword}%`);
  if (publisherId) query.eq("publisher_id", publisherId);
  if (platformId) query.eq("platform_id", platformId);
  if (regionId) query.eq("region_id", regionId);
  if (isLicensed !== null && isLicensed !== undefined)
    query.eq("is_licensed", isLicensed);
  if (dateRange) {
    if (dateRange.dateFrom)
      query.gte("release_date", `${dateRange.dateFrom}-01-01`);
    if (dateRange.dateTo)
      query.lte("release_date", `${dateRange.dateTo}-12-31`);
  }

  // Execute query
  const { data, error } = await query;
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
    region_tag: release.region_tag?.tag ?? undefined,
  }));

  return { releases: transformedData };
}

export async function getCount(
  publisherId: number | null,
  platformId: number | null,
  regionId: number | null,
  isLicensed: boolean | null,
  dateRange: {
    dateFrom: string | undefined;
    dateTo: string | undefined;
  } | null,
  isAscending: boolean,
  keyword?: string,
) {
  const query = supabase
    .from("releases")
    .select("id", { count: "exact", head: true });
  if (keyword && keyword.length > 0) query.ilike("title", `%${keyword}%`);
  if (publisherId) query.eq("publisher_id", publisherId);
  if (platformId) query.eq("platform_id", platformId);
  if (regionId) query.eq("region_id", regionId);
  if (isLicensed !== null && isLicensed !== undefined)
    query.eq("is_licensed", isLicensed);
  if (dateRange) {
    if (dateRange.dateFrom)
      query.gte("release_date", `${dateRange.dateFrom}-01-01`);
    if (dateRange.dateTo)
      query.lte("release_date", `${dateRange.dateTo}-12-31`);
  }

  // Execute Supabase query
  const { count, error } = await query;
  if (error) {
    console.error("Error fetching count:", error);
  }
  return count;
}

export async function getPublishers() {
  const query = supabase.from("publishers").select("id, name");

  // Execute query
  const { data, error } = await query;
  if (error) throw new Error("Supabase error: ", error);

  // Validate and transform data
  const parsedData = await PublishersSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Invalid data format from Supabase");

  const transformedData: PublishersModel = parsedData.data.map((publisher) => ({
    id: publisher.id,
    name: publisher.name,
  }));

  return { publishers: transformedData };
}
