"use client";

import { FilterProvider } from "@/context/Filter.context";
import { useReleases } from "@/hooks/useReleases";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import ReleasesTable from "../table/ReleasesTable";
import SearchBar from "./SearchBar";

const SearchTable = () => {
  return (
    <FilterProvider>
      <Component />
    </FilterProvider>
  );
};
export default SearchTable;

const Component = () => {
  // Hooks
  const [recordPerPage, setRecordPerPage] = useState<number>(30);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [cursors, setCursors] = useState<number[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword] = useDebounce(keyword, 1000);
  const { releases, loading } = useReleases(
    recordPerPage,
    pageIndex,
    cursors,
    debouncedKeyword,
    setPageIndex,
    setCursors,
  );

  return (
    <>
      <SearchBar
        keyword={keyword}
        recordPerPage={recordPerPage}
        setKeyword={setKeyword}
        onPerPageChange={(value) => setRecordPerPage(Number(value))}
      />
      <ReleasesTable
        data={releases}
        isLoading={loading}
        recordPerPage={recordPerPage}
        pageIndex={pageIndex}
        pageCount={cursors.length}
        onPageChange={setPageIndex}
      />
    </>
  );
};
