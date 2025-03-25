"use client";

import { useFilters } from "@/hooks/useFilters";
import { SelectOptionsModel } from "@/lib/models/ui.models";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import RRInput from "../features/RRInput";
import RRSelect from "../features/RRSelect";

const OPTIONS: SelectOptionsModel = [
  { value: "15", title: "15 Results Per Page" },
  { value: "30", title: "30 Results Per Page" },
  { value: "50", title: "50 Results Per Page" },
  { value: "100", title: "100 Results Per Page" },
];

export default function SearchBar() {
  const router = useRouter();
  const { keyword, pageSize, setKeyword, setPageSize, setPageIndex } =
    useFilters();
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

  const handlePageSizeChange = (value: string | undefined) => {
    setPageSize(Number(value));
    setPageIndex(0);
  };

  return (
    <form className="mb-6 flex justify-center space-x-1">
      <RRInput
        type="text"
        value={debouncedKeyword}
        onChange={(e) => handleSearch(e)}
        placeholder="Search games..."
        className="max-w-96"
      />
      <RRSelect
        options={OPTIONS}
        onChange={handlePageSizeChange}
        value={pageSize.toString()}
        className="w-[200px]"
      />
    </form>
  );
}
