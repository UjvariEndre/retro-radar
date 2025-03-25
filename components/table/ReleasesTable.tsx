"use client";

import { useFilters } from "@/hooks/useFilters";
import { useReleases } from "@/hooks/useReleases";
import { getImageUrlForRelease } from "@/lib/helpers";
import { ReleaseItemModel, ReleasesModel } from "@/lib/models/releases.model";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import FallbackImage from "../features/FallbackImage";
import { Skeleton } from "../ui/skeleton";
import NavButtons from "./NavButtons";

const COLUMNS: ColumnDef<ReleaseItemModel>[] = [
  {
    accessorKey: "cover_image",
    header: "Cover",
    cell: ({ row }) => (
      <FallbackImage
        src={getImageUrlForRelease(
          "box-front/thumbnail",
          row.original.id?.toString() ?? "",
        )}
        alt={row.original.title}
        className="rounded-md object-cover"
        width={150}
        height={150}
      />
    ),
  },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "is_licensed", header: "Licensed" },
  { accessorKey: "release_date", header: "Released" },
  { accessorKey: "publisher_name", header: "Publisher" },
  { accessorKey: "platform_name", header: "Platform" },
  { accessorKey: "region_tag", header: "Region" },
];

const ReleasesTable = () => {
  // Hooks
  const { releases, loading } = useReleases();
  const { pageSize } = useFilters();
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
      <NavButtons />
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
                  <td key={cell.id} className="px-2 py-5">
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
