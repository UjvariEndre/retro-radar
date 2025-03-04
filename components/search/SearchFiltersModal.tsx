import { LucideSlidersHorizontal } from "lucide-react";
import RRButton from "../features/RRButton";
import SearchFilterForm from "../forms/SearchFilterForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const SearchFiltersModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RRButton variant="secondary">
          <LucideSlidersHorizontal />
          Filters
        </RRButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
                <DialogClose asChild>
                  <RRButton type="button" variant="secondary">
                    Close
                  </RRButton>
                </DialogClose>
                <RRButton type="submit">Apply Filters</RRButton>
              </DialogFooter>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SearchFiltersModal;
