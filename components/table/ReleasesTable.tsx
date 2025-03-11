"use client";

import { useFilters } from "@/hooks/useFilters";
import { useReleases } from "@/hooks/useReleases";
import { ReleaseItemModel, ReleasesModel } from "@/lib/models/releases.model";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import RRButton from "../features/RRButton";
import { Skeleton } from "../ui/skeleton";

const COLUMNS: ColumnDef<ReleaseItemModel>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "is_licensed", header: "Licensed" },
  { accessorKey: "release_date", header: "Released" },
  { accessorKey: "publisher_name", header: "Publisher" },
  { accessorKey: "platform_name", header: "Platform" },
  { accessorKey: "region_tag", header: "Region" },
];

const ReleasesTable = () => {
  // Hooks
  const { releases, loading, count } = useReleases();
  const { pageSize, pageIndex, setPageIndex } = useFilters();
  const table = useReactTable({
    data: loading ? Array(10).fill({}) : releases,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      {!loading && releases.length === 0 ? (
        <NoResultsPlaceholder />
      ) : (
        <DataTable table={table} isLoading={loading} recordPerPage={pageSize} />
      )}
      <div className="mt-2 flex gap-2">
        <RRButton
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          variant="secondary"
        >
          <LucideChevronLeft />
          Prev
        </RRButton>
        <RRButton
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={(pageIndex + 1) * pageSize >= count}
          variant="secondary"
        >
          Next <LucideChevronRight />
        </RRButton>
      </div>
    </div>
  );
};
export default ReleasesTable;

interface DataTableProps {
  table: ReturnType<typeof useReactTable<ReleasesModel>>;
  isLoading: boolean;
  recordPerPage: number;
}

const DataTable = ({ table, isLoading, recordPerPage }: DataTableProps) => {
  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border bg-white text-sm">
      <thead className="bg-slate-100 text-left text-slate-700">
        {isLoading ? (
          <tr key={uuidv4()}>
            {COLUMNS.map(() => {
              return (
                <th key={uuidv4()} className="p-2">
                  <Skeleton className="h-5 w-32" />
                </th>
              );
            })}
          </tr>
        ) : (
          table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))
        )}
      </thead>
      <tbody>
        {isLoading
          ? Array.from({ length: recordPerPage }).map((_, index) => (
              <tr key={index} className="border-b border-slate-100">
                {COLUMNS.map(() => {
                  return (
                    <td key={uuidv4()} className="p-2">
                      <Skeleton className="h-5 w-32" />
                    </td>
                  );
                })}
              </tr>
            ))
          : table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
};

const NoResultsPlaceholder = () => {
  return (
    <div className="rounded-lg bg-white p-3 text-gray-500">No Results</div>
  );
};
