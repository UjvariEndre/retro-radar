import { getCount, getReleases } from "@/lib/api";
import { ReleasesModel } from "@/lib/models/releases.model";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFilters } from "./useFilters";

export function useReleases() {
  const [releases, setReleases] = useState<ReleasesModel>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState("created_at");
  const { filters, pageSize, pageIndex, keyword } = useFilters();

  const publisherId = filters.publisher ? filters.publisher.id : null;
  const platformId = filters.platform ? filters.platform.id : null;
  const regionId = filters.region ? filters.region.id : null;
  const isLicensed = filters.license_status
    ? filters.license_status === "licensed_only"
    : null;
  const dateRange = useMemo(() => {
    const dateFrom = filters.date_from;
    const dateTo = filters.date_to;
    if (!dateFrom && !dateTo) return null;
    return { dateFrom: filters.date_from, dateTo: filters.date_to };
  }, [filters.date_from, filters.date_to]);

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
        platformId,
        regionId,
        isLicensed,
        dateRange,
        sortBy,
      });
      setReleases(newReleases);
    } catch (error) {
      setError(`Failed to fetch releases: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [
    pageSize,
    pageIndex,
    keyword,
    publisherId,
    platformId,
    regionId,
    isLicensed,
    dateRange,
    sortBy,
  ]);

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
        const newCount = await getCount(
          publisherId,
          platformId,
          regionId,
          isLicensed,
          dateRange,
          false,
          keyword,
        );
        setCount(newCount ?? 0);
      } catch (error) {
        setError(`Failed to fetch releases count: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [keyword, publisherId, platformId, regionId, isLicensed, dateRange]);

  return {
    releases,
    loading,
    error,
    count,
    sortBy,
    setSortBy,
  };
}
