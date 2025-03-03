"use client";

import { useReleases } from "@/hooks/useReleases";
import { useState } from "react";
import ReleasesTable from "../table/ReleasesTable";
import SearchBar from "./SearchBar";

const SearchTable = () => {
  // Hooks
  const [recordPerPage, setRecordPerPage] = useState<number>(30);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [cursors, setCursors] = useState<number[]>([]);
  const { releases, loading } = useReleases(
    recordPerPage,
    pageIndex,
    cursors,
    setPageIndex,
    setCursors,
  );

  return (
    <>
      <SearchBar onPerPageChange={(value) => setRecordPerPage(Number(value))} />
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
export default SearchTable;
