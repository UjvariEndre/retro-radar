import { getPaginationCursors, getReleases } from "@/lib/api";
import { ReleasesModel } from "@/lib/models/releases.model";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useReleases(
  pageSize = 30,
  pageIndex: number = 0,
  cursors: number[],
  keyword: string,
  setPageIndex: (pageIndex: number) => void,
  setCursors: (cursors: number[]) => void,
) {
  const [releases, setReleases] = useState<ReleasesModel>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<
    Record<string, string | number | null>
  >({});
  const [sortBy, setSortBy] = useState("created_at");

  useEffect(() => {
    async function loadCursors() {
      const cursorList = await getPaginationCursors(pageSize);
      setCursors(cursorList);
      setPageIndex(0);
    }
    loadCursors();
  }, [pageSize, setPageIndex, setCursors]); // Reload when the user changes page size

  const cursorId = useMemo(() => cursors[pageIndex], [cursors, pageIndex]);

  // Fetch releases with error handling
  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { releases: newReleases } = await getReleases({
        pageSize,
        cursorId,
        keyword,
        sortBy,
        filters,
      });

      setReleases(newReleases);
    } catch (error) {
      setError(`Failed to fetch releases: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [pageSize, cursorId, keyword, sortBy, filters]);

  // Automatically fetch releases when dependencies change
  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  return {
    releases,
    loading,
    error,
    filters,
    setFilters,
    sortBy,
    setSortBy,
  };
}
