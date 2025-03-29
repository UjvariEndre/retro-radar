"use client";

import { FilterProvider } from "@/context/Filter.context";
import { useFilters } from "@/hooks/useFilters";
import { LOCAL_STORAGE_KEYS, localStorageUtils } from "@/lib/localStorage";
import { LucideLayoutGrid, LucideList } from "lucide-react";
import { useEffect, useState } from "react";
import RRButton from "../features/RRButton";
import RRSelect from "../features/RRSelect";
import ReleaseList from "../layout/table/ReleaseList";
import SearchBar from "./SearchBar";
import SearchFiltersModal from "./SearchFiltersModal";

export enum ReleaseListVariant {
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
  const [view, setView] = useState<ReleaseListVariant | null>(null);
  const { pageIndex, setPageSize } = useFilters();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.releaseListViewMode);
    if (stored === String(ReleaseListVariant.MosaicView)) {
      setView(ReleaseListVariant.MosaicView);
    } else {
      setView(ReleaseListVariant.ListView);
    }
  }, []);

  const onListView = () => {
    setView(ReleaseListVariant.ListView);
    localStorageUtils.setReleaseListViewMode(ReleaseListVariant.ListView);
    setPageSize(30);
  };

  const onMosaicView = () => {
    setView(ReleaseListVariant.MosaicView);
    localStorageUtils.setReleaseListViewMode(ReleaseListVariant.MosaicView);
    setPageSize(36);
  };

  return (
    <>
      <SearchBar />

      {/* Header */}
      <form className="flex w-full items-center justify-between space-x-1 rounded-t-lg bg-secondary p-1">
        <SearchFiltersModal />

        <div className="flex items-center space-x-1">
          <RRButton
            variant="outline"
            onClick={onListView}
            isActive={view === ReleaseListVariant.ListView}
          >
            <LucideList />
          </RRButton>
          <RRButton
            variant="outline"
            onClick={onMosaicView}
            isActive={view === ReleaseListVariant.MosaicView}
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
      <ReleaseList listVariant={view ?? ReleaseListVariant.ListView} />
    </>
  );
};
