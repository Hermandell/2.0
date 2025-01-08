"use client";

import * as React from "react";
import { Column } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "../ui/date-picker";

interface DataTableDateFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

const operators = [
  { label: "Equal to", value: "equals" },
  { label: "After", value: "gt" },
  { label: "Before", value: "lt" },
];

export function DataTableDateFilter<TData, TValue>({
  column,
  title,
}: DataTableDateFilterProps<TData, TValue>) {
  const [operator, setOperator] = React.useState("equals");
  const [date, setDate] = React.useState<Date>();

  // Update the filter when either operator or date changes
  React.useEffect(() => {
    if (date) {
      column?.setFilterValue({ operator, date });
    }
  }, [operator, date, column]);

  const filterValue = column?.getFilterValue() as
    | { operator: string; date: Date }
    | undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {filterValue?.date && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="hidden space-x-1 lg:flex">
                <span className="text-sm">
                  {
                    operators.find((op) => op.value === filterValue.operator)
                      ?.label
                  }{" "}
                  {format(filterValue.date, "PP")}
                </span>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Operator</label>
            <Select value={operator} onValueChange={setOperator}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {operators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <DateTimePicker granularity="day" value={date} onChange={setDate} />
          </div>
          {filterValue?.date && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setDate(undefined);
                setOperator("equals");
                column?.setFilterValue(undefined);
              }}
            >
              Clear filter
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
