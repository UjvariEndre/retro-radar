import { getCount, getReleases } from "@/lib/api";
import { ReleasesModel } from "@/lib/models/releases.model";
import { useCallback, useEffect, useState } from "react";
import { useFilters } from "./useFilters";

export function useReleases() {
  const [releases, setReleases] = useState<ReleasesModel>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState("created_at");
  const { filters, pageSize, pageIndex, keyword } = useFilters();

  const publisherId = filters.publisher?.id ?? null; // Extract primitive values

  // Fetch releases with error handling
  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { releases: newReleases } = await getReleases({
        pageSize,
        pageIndex,
        keyword,
        publisherId,
        sortBy,
      });
      setReleases(newReleases);
    } catch (error) {
      setError(`Failed to fetch releases: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [pageSize, pageIndex, keyword, publisherId, sortBy]);

  // Automatically fetch releases when dependencies change
  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  // Fetch release count separately
  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);
      setError(null);
      try {
        const newCount = await getCount(publisherId, false, keyword);
        setCount(newCount ?? 0);
      } catch (error) {
        setError(`Failed to fetch releases count: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [keyword, publisherId]);

  return {
    releases,
    loading,
    error,
    count,
    sortBy,
    setSortBy,
  };
}
