import { FilterContext } from "@/context/Filter.context";
import { useContext } from "react";

// Custom hook for using the context
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
