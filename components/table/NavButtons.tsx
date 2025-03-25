import { useFilters } from "@/hooks/useFilters";
import { useReleases } from "@/hooks/useReleases";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { useMemo } from "react";
import RRButton from "../features/RRButton";

const NavButtons = () => {
  const { pageSize, pageIndex, setPageIndex } = useFilters();
  const { count } = useReleases();

  const total = useMemo(() => {
    return Math.ceil(count / pageSize);
  }, [count, pageSize]);

  const pageArray = useMemo(() => {
    const result: number[] = [];
    let start = Math.max(0, pageIndex - 2);
    let end = start + 5;
    if (end > total) {
      end = total;
      start = Math.max(0, end - 5);
    }
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }, [total, pageIndex]);

  return (
    <>
      <div className="mt-2 flex justify-center gap-2">
        <RRButton
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          variant="secondary"
        >
          <LucideChevronLeft />
          Prev
        </RRButton>
        {pageArray.map((page) => (
          <RRButton
            key={page}
            onClick={() => setPageIndex(page)}
            variant="secondary"
            isActive={page === pageIndex}
          >
            {page + 1}
          </RRButton>
        ))}
        <RRButton
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={(pageIndex + 1) * pageSize >= count}
          variant="secondary"
        >
          Next <LucideChevronRight />
        </RRButton>
      </div>

      <p className="mt-1 flex justify-center text-white">{`Page ${pageIndex + 1} / ${total}`}</p>
    </>
  );
};

export default NavButtons;
