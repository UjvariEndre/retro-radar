"use client";

import { FilterProvider } from "@/context/Filter.context";
import { useFilters } from "@/hooks/useFilters";
import { LucideLayoutGrid, LucideList } from "lucide-react";
import { useEffect, useState } from "react";
import RRButton from "../features/RRButton";
import RRSelect from "../features/RRSelect";
import ListView from "../layout/table/ListView";
import MosaicView from "../layout/table/MosaicView";
import SearchBar from "./SearchBar";
import SearchFiltersModal from "./SearchFiltersModal";

enum ListViewVariant {
  "ListView",
  "MosaicView",
}

const SORT_OPTIONS = [
  { value: "15", title: "Default" },
  { value: "30", title: "Name [A-Z]" },
  { value: "50", title: "Release Date" },
];

const SearchTable = () => {
  return (
    <FilterProvider>
      <Component />
    </FilterProvider>
  );
};
export default SearchTable;

const Component = () => {
  const [view, setView] = useState<ListViewVariant>(ListViewVariant.ListView);
  const { pageIndex } = useFilters();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);
  return (
    <>
      <SearchBar />

      {/* Header */}
      <form className="flex w-full items-center justify-between space-x-1 rounded-t-lg bg-secondary p-1">
        <SearchFiltersModal />

        <div className="flex items-center space-x-1">
          <RRButton
            variant="outline"
            onClick={() => setView(ListViewVariant.ListView)}
            isActive={view === ListViewVariant.ListView}
          >
            <LucideList />
          </RRButton>
          <RRButton
            variant="outline"
            onClick={() => setView(ListViewVariant.MosaicView)}
            isActive={view === ListViewVariant.MosaicView}
          >
            <LucideLayoutGrid />
          </RRButton>
        </div>

        <RRSelect
          options={SORT_OPTIONS}
          onChange={() => console.log("change")}
          className="w-[200px]"
        />
      </form>

      {/* List */}
      {view === ListViewVariant.MosaicView ? <MosaicView /> : <ListView />}
    </>
  );
};
