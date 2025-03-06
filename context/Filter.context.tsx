import { SearchFilterModel } from "@/lib/models/searchFilters.model";
import { createContext, ReactNode, useState } from "react";

interface FilterContextType {
  filters: SearchFilterModel;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterModel>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<SearchFilterModel>({
    platform_name: undefined,
    publisher_name: undefined,
    license_status: undefined,
    region_name: undefined,
    date_from: undefined,
    date_to: undefined,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
