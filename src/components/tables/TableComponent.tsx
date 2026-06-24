"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { DataTablePagination } from "../ui/data-pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataTableFacetedFilter } from "../ui/command-range";
import {
  useCreateProductMutation,
} from "@/services/ecommerce";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [createNewProduct, { isLoading, error }] = useCreateProductMutation();
 

  //mock data 
  const newProduct = {
  name: "Logitech MX Master 3S",
  description:
    "Premium wireless productivity mouse with ultra-fast scrolling.",
  mouseSpec: {
    sensor: "Darkfield High Precision Sensor",
    dpi: "8000 DPI",
    connectivity: "Bluetooth, Logi Bolt USB Receiver",
    battery: "Up to 70 days on a full charge",
    charging: "USB-C Fast Charging",
    buttons: "7 Customizable Buttons",
    compatibility: "Windows, macOS, Linux, ChromeOS",
  },
  stockQuantity: 50,
  priceIn: 65,
  priceOut: 99,
  discount: 10,
  color: [
    {
      color: "Graphite",
      images: [
        "https://i.pinimg.com/736x/6d/17/ff/6d17ff91535fd429b1ef0ca9532755fe.jpg",
        "https://i.pinimg.com/736x/6d/17/ff/6d17ff91535fd429b1ef0ca9532755fe.jpg",
      ],
    },
    {
      color: "Pale Gray",
      images: [
        "https://i.pinimg.com/736x/6d/17/ff/6d17ff91535fd429b1ef0ca9532755fe.jpg",
       
      ],
    },
  ],
  thumbnail:
    "https://i.pinimg.com/736x/6d/17/ff/6d17ff91535fd429b1ef0ca9532755fe.jpg",
  warranty: "2 years manufacturer warranty",
  availability: true,
  images: [
    "https://images.unsplash.com/photo-1527814050087-3793815479db",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    "https://images.unsplash.com/photo-1629429408209-1f912961dbd8",
  ],
    categoryUuid: "462d9f60-8346-45ab-b8b3-a597d240965b",
    supplierUuid: "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
    brandUuid: "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb",
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

 
  // Helper to get ALL unique values (not affected by current filters)
  const getFacetedOptions = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (!column) return [];

    // Get all rows from the original data
    const allRows = table.getPreFilteredRowModel().rows;

    const uniqueValues = new Set<string>();

    allRows.forEach((row) => {
      const value = row.getValue(columnId);
      if (value != null) {
        uniqueValues.add(String(value));
      }
    });

    return Array.from(uniqueValues)
      .sort()
      .map((value) => ({
        label: value,
        value: value,
      }));
  };

  //handle create new product 
  const handleCreateNewProduct = () => {
    createNewProduct(
      {
        newProduct:JSON.stringify( newProduct),
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN
      }
    )
  }
  return (
    <>
      <div>
        <div className="flex items-center py-4 gap-5">
          <div className="flex gap-4">
            <Input
              placeholder="Filter name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            {/* command filter */}

            <DataTableFacetedFilter
              column={table.getColumn("name")}
              title="Name"
              options={getFacetedOptions("name")}
            />
            {/* price */}
            <DataTableFacetedFilter
              column={table.getColumn("priceOut")}
              title="Price"
              options={getFacetedOptions("priceOut")}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* button create new product  */}
          <Button onClick={() => handleCreateNewProduct()}>
            Create Product
          </Button>
        </div>

        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* data table pagination */}
        <div className="mt-5">
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  );
}
