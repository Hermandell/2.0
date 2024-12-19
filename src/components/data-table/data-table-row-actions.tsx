"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Trash2, CheckSquare, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { TakeTaskModal } from "@/components/modals/take-task-modals";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showTakeModal, setShowTakeModal] = useState(false);

  const task = row.original as any; // Type assertion for demo purposes

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setShowTakeModal(true)}>
            <CheckSquare className="mr-2 h-4 w-4" />
            Take
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TakeTaskModal
        isOpen={showTakeModal}
        onClose={() => setShowTakeModal(false)}
        taskId={task.id}
        taskTitle={task.title}
      />
    </>
  );
}