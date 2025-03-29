import { getPublishers } from "@/lib/api";
import { PublishersModel } from "@/lib/models/publishers.model";
import { useCallback, useEffect, useState } from "react";

export function usePublishers() {
  const [publishers, setPublishers] = useState<PublishersModel>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { publishers: newPublishers } = await getPublishers();
      setPublishers(newPublishers);
    } catch (error) {
      setError(`Failed to fetch publishers: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublishers();
  }, [fetchPublishers]);

  return {
    publishers,
    loading,
    error,
  };
}
