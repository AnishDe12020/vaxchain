"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Task } from "./schema"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vaccine ID" />
    ),
    cell: ({ row }) => <div className="w-[70px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "patientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[90px]">{row.getValue("patientName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "patientId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Govt ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[70px]">{row.getValue("patientId")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "injectedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Doctor" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("injectedBy")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("dateTime")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
