"use client";

import { useFilters } from "@/hooks/useFilters";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import RRInput from "../features/RRInput";

export default function SearchBar() {
  const router = useRouter();
  const { keyword, setKeyword, setPageIndex } = useFilters();
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(debouncedKeyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedKeyword, setKeyword]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ?? "";
    setDebouncedKeyword(value);
    router.push(`/search?query=${encodeURIComponent(value)}`);
    setPageIndex(0);
  };

  return (
    <form className="mb-6 flex justify-center space-x-1">
      <RRInput
        type="text"
        value={debouncedKeyword}
        onChange={(e) => handleSearch(e)}
        placeholder="Search game titles..."
        className="max-w-96"
      />
    </form>
  );
}
