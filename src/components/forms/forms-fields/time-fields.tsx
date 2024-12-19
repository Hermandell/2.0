"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface TimeFieldsProps {
  form: UseFormReturn<any>;
}

export function TimeFields({ form }: TimeFieldsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { name: "hours", max: 23, label: "Hours", placeholder: "HH" },
        { name: "minutes", max: 59, label: "Minutes", placeholder: "MM" },
        { name: "seconds", max: 59, label: "Seconds", placeholder: "SS" },
      ].map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max={field.max}
                  placeholder={field.placeholder}
                  {...formField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}