import { SearchFilterModel } from "@/lib/models/searchFilters.model";
import { createContext, ReactNode, useReducer } from "react";

interface FilterState {
  filters: SearchFilterModel;
  pageIndex: number;
  pageSize: number;
  keyword: string;
}

type FilterAction =
  | { type: "SET_FILTERS"; payload: SearchFilterModel }
  | { type: "SET_KEYWORD"; payload: string }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_PAGE_INDEX"; payload: number };

const initialState: FilterState = {
  filters: {
    platform_name: undefined,
    publisher: undefined,
    license_status: undefined,
    region_name: undefined,
    date_from: undefined,
    date_to: undefined,
  },
  pageIndex: 0,
  pageSize: 30,
  keyword: "",
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, filters: action.payload, pageIndex: 0 }; // Reset pageIndex
    case "SET_KEYWORD":
      return { ...state, keyword: action.payload, pageIndex: 0 }; // Reset pageIndex
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload, pageIndex: 0 }; // Reset pageIndex
    case "SET_PAGE_INDEX":
      return { ...state, pageIndex: action.payload };
    default:
      return state;
  }
}

interface FilterContextType extends FilterState {
  setFilters: (filters: SearchFilterModel) => void;
  setKeyword: (keyword: string) => void;
  setPageSize: (size: number) => void;
  setPageIndex: (index: number) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setFilters: (filters) =>
          dispatch({ type: "SET_FILTERS", payload: filters }),
        setKeyword: (keyword) =>
          dispatch({ type: "SET_KEYWORD", payload: keyword }),
        setPageSize: (size) =>
          dispatch({ type: "SET_PAGE_SIZE", payload: size }),
        setPageIndex: (index) =>
          dispatch({ type: "SET_PAGE_INDEX", payload: index }),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
