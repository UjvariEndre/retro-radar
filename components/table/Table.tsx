"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import ButtonPrimary from "../features/RRButton";

interface TableProps {
  data: unknown[];
  columns: ColumnDef<unknown, unknown>[];
}

const Table = ({ data, columns }: TableProps) => {
  const pageSize = 30;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
    manualPagination: false,
  });

  return (
    <div>
      <table className="w-full border-collapse overflow-hidden rounded-lg border bg-white text-sm">
        <thead className="bg-slate-100 text-left text-slate-700">
          {table.getHeaderGroups().map((headerGroup) => (
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
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
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

      <div className="mt-2 flex gap-2">
        <ButtonPrimary
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="secondary"
          type="submit"
        >
          <LucideChevronLeft />
          Prev
        </ButtonPrimary>
        <ButtonPrimary
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="secondary"
          type="submit"
        >
          Next <LucideChevronRight />
        </ButtonPrimary>
      </div>
    </div>
  );
};
export default Table;
