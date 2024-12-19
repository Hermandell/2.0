"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenericForm } from "../generic-form";
import { DateField } from "../forms-fields/date-field";
import { TimeFields } from "../forms-fields/time-fields";
import { SearchableSelect } from "../forms-fields/searchable-select";
import { assignees } from "./config";
import { takeTaskSchema, type TakeTaskFormData } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/forms/forms-fields";
import { Textarea } from "@/components/ui/textarea";

interface TakeTaskFormProps {
  onSubmit: (data: TakeTaskFormData) => void;
}

export function TakeTaskForm({ onSubmit }: TakeTaskFormProps) {
  const form = useForm<TakeTaskFormData>({
    resolver: zodResolver(takeTaskSchema),
    defaultValues: {
      hours: "",
      minutes: "",
      seconds: "",
      assignee: "",
      notes: "",
    },
  });

  return (
    <GenericForm form={form} onSubmit={onSubmit} submitLabel="Take Task">
      <DateField form={form} name="date" label="Date" />
      <TimeFields form={form} />
      <SearchableSelect
        form={form}
        name="assignee"
        label="Assignee"
        options={assignees}
        placeholder="Search assignee..."
      />
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional notes..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </GenericForm>
  );
}