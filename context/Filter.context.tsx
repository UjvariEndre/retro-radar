import { SearchFilterModel } from "@/lib/models/searchFilters.model";
import { createContext, ReactNode, useState } from "react";

interface FilterContextType {
  filters: SearchFilterModel;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterModel>>;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<SearchFilterModel>({
    platform: undefined,
    publisher: undefined,
    region: undefined,
    license_status: undefined,
    date_from: undefined,
    date_to: undefined,
  });
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(30);
  const [keyword, setKeyword] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
        keyword,
        setKeyword,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
