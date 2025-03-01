"use client";

import { useReleases } from "@/hooks/useReleases";
import Table from "../table/Table";
import SearchBar from "./SearchBar";

const SearchTable = () => {
  const { releases } = useReleases(1000);

  return (
    <>
      <SearchBar />
      <Table data={releases} columns={columns} />
    </>
  );
};
export default SearchTable;

const columns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "is_licensed", header: "Licensed" },
  { accessorKey: "release_date", header: "Released" },
  { accessorKey: "publisher_name", header: "Publisher" },
  { accessorKey: "platform_name", header: "Platform" },
  { accessorKey: "market_tag", header: "Market" },
];
