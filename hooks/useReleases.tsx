import { getReleases } from "@/lib/api";
import { ReleasesModel } from "@/lib/models/releases.model";
import { useCallback, useEffect, useState } from "react";

export function useReleases(pageSize = 10) {
  const [releases, setReleases] = useState<ReleasesModel>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<
    Record<string, string | number | null>
  >({});
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch releases with error handling
  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { releases: newReleases, total } = await getReleases({
        page,
        pageSize,
        sortBy,
        sortOrder,
        filters,
      });

      setReleases(newReleases);
      setTotalPages(Math.max(1, Math.ceil((total ?? 0) / pageSize)));
    } catch (error) {
      setError(`Failed to fetch releases: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortOrder, filters]);

  // Automatically fetch releases when dependencies change
  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  // Reset page when filters, sorting, or order change
  useEffect(() => {
    setPage(1);
  }, [filters, sortBy, sortOrder]);

  return {
    releases,
    page,
    setPage,
    totalPages,
    loading,
    error,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
}
