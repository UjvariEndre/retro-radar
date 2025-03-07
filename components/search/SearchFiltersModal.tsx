import { useFilters } from "@/hooks/useFilters";
import { LucideSlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import ButtonIndicator from "../features/ButtonIndicator";
import RRButton from "../features/RRButton";
import SearchFilterForm from "../forms/SearchFilterForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const SearchFiltersModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useFilters();

  const values = useMemo(() => {
    return Object.values(filters).filter((f) => f !== undefined && f !== "");
  }, [filters]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <RRButton variant="secondary">
          <LucideSlidersHorizontal />
          Filters
          {values.length > 0 && <ButtonIndicator />}
        </RRButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Refine Your Search</DialogTitle>
          <DialogDescription>
            Narrow down your results by applying filters. You can search by
            platform, publisher, release year, or region to find exactly what
            you’re looking for.
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <SearchFilterForm
            footer={
              <DialogFooter>
                <RRButton
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </RRButton>
                <RRButton type="submit">Apply Filters</RRButton>
              </DialogFooter>
            }
            onClose={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SearchFiltersModal;
