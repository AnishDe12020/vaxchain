"use client"

import { useState } from "react"
import Link from "next/link"
import { truncatePubkey } from "@/utils/truncate"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Batch } from "database"
import { ArrowRightIcon, ChevronDownIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// export const columns: ColumnDef<Batch>[] = [
//   {
//     id: "name",
//     header: "Name",
//     cell: ({ row, cell, table }) => {
//       console.log(row.getAllCells())
//       return <p>{row.getValue("name")}</p>
//     },
//   },
//   {
//     id: "quantity",
//     header: "Quantity",
//     cell: ({ row }) => <p>{row.getValue("quantity")}</p>,
//   },
// ]

const Batches = ({ batches }: { batches: Batch[] }) => {
  //   const [sorting, setSorting] = useState<SortingState>([])
  //   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  //   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  //   const [rowSelection, setRowSelection] = useState({})
  //   const table = useReactTable({
  //     data: batches,
  //     columns,
  //     onSortingChange: setSorting,
  //     onColumnFiltersChange: setColumnFilters,
  //     getCoreRowModel: getCoreRowModel(),
  //     getPaginationRowModel: getPaginationRowModel(),
  //     getSortedRowModel: getSortedRowModel(),
  //     getFilteredRowModel: getFilteredRowModel(),
  //     onColumnVisibilityChange: setColumnVisibility,
  //     onRowSelectionChange: setRowSelection,
  //     state: {
  //       sorting,
  //       columnFilters,
  //       columnVisibility,
  //       rowSelection,
  //     },
  //   })

  console.log(batches)

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Link href="/dashboard/new-batch" className={buttonVariants()}>
          New batch
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Public Key</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Defect</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell>{batch.name}</TableCell>
                <TableCell>
                  {batch.quantity} x {batch.costPerPiece} ={" "}
                  {batch.quantity * batch.costPerPiece}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    {`${batch.tempMin - 273}°C`}{" "}
                    <ArrowRightIcon className="w-4 h-4" />
                    {`${batch.tempMax - 273}°C`}
                  </div>
                </TableCell>
                <TableCell className="w-fit">
                  {truncatePubkey(batch.pubkey)}
                  <Button
                    size="xs"
                    variant="outline"
                    className="ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(batch.pubkey)
                      toast.success("Copied to clipboard")
                    }}
                  >
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  {batch.status === "Manufactured" ? (
                    <Badge className="bg-orange-500">Manufactured</Badge>
                  ) : batch.status === "ReceivedByDoctor" ? (
                    <Badge className="bg-green-500">Sold</Badge>
                  ) : (
                    <Badge className="bg-yellow-500">Stored</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {batch.tempDefect ? (
                    <Badge className="bg-red-500">Defect</Badge>
                  ) : (
                    <Badge className="bg-green-500">No defect</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/batch/${batch.pubkey}`}
                    className={buttonVariants({ size: "sm" })}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Batches
