"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/data/tasks";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";

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
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return <Badge className="capitalize">{priority}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          {format(new Date(row.getValue("createdAt")), 'MM/dd/yyyy')}
        </div>
      );
    },
    filterFn: (row, id, value: { operator: string; date: Date }) => {
      const cellDate = new Date(row.getValue(id));
      const filterDate = new Date(value.date);
      
      switch (value.operator) {
        case "equals":
          return cellDate.toDateString() === filterDate.toDateString();
        case "gt":
          return cellDate > filterDate;
        case "lt":
          return cellDate < filterDate;
        default:
          return true;
      }
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string | undefined;
      return (
        <div className="w-[100px]">
{dueDate ? format(new Date(dueDate), 'MM/dd/yyyy') : "-"}
</div>
      );
    },
    filterFn: (row, id, value: { operator: string; date: Date }) => {
      const dueDate = row.getValue(id) as string | undefined;
      if (!dueDate) return false;
      
      const cellDate = new Date(dueDate);
      const filterDate = new Date(value.date);
      
      switch (value.operator) {
        case "equals":
          return cellDate.toDateString() === filterDate.toDateString();
        case "gt":
          return cellDate > filterDate;
        case "lt":
          return cellDate < filterDate;
        default:
          return true;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];