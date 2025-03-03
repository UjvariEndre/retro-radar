"use client";

import { ReleaseItemModel, ReleasesModel } from "@/lib/models/releases.model";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import ButtonPrimary from "../features/RRButton";
import { Skeleton } from "../ui/skeleton";

interface ReleasesTableProps {
  data: ReleasesModel;
  isLoading: boolean;
  recordPerPage: number;
  pageIndex: number;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
}

const ReleasesTable = ({
  data,
  isLoading,
  recordPerPage,
  pageIndex,
  pageCount,
  onPageChange,
}: ReleasesTableProps) => {
  // Hooks
  const table = useReactTable({
    data: isLoading ? Array(10).fill({}) : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <DataTable
        table={table}
        isLoading={isLoading}
        recordPerPage={recordPerPage}
      />
      <div className="mt-2 flex gap-2">
        <ButtonPrimary
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          variant="secondary"
        >
          <LucideChevronLeft />
          Prev
        </ButtonPrimary>
        <ButtonPrimary
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          variant="secondary"
        >
          Next <LucideChevronRight />
        </ButtonPrimary>
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
          <tr>
            {columns.map((col) => {
              return (
                <th key={col.id} className="p-2">
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
                {columns.map((col) => {
                  return (
                    <td key={col.id} className="p-2">
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

const columns: ColumnDef<ReleaseItemModel>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "is_licensed", header: "Licensed" },
  { accessorKey: "release_date", header: "Released" },
  { accessorKey: "publisher_name", header: "Publisher" },
  { accessorKey: "platform_name", header: "Platform" },
  { accessorKey: "market_tag", header: "Market" },
];
