"use client";

import { FilterProvider } from "@/context/Filter.context";
import ReleasesTable from "../table/ReleasesTable";
import SearchBar from "./SearchBar";

const SearchTable = () => {
  return (
    <FilterProvider>
      <SearchBar />
      <ReleasesTable />
    </FilterProvider>
  );
};
export default SearchTable;
