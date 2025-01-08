"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BaseInputProps {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "tel" | "url" | "search";
  placeholder?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function BaseInput({
  name,
  label,
  type = "text",
  placeholder,
  description,
  min,
  max,
  step,
  pattern,
  required,
  disabled,
  className,
}: BaseInputProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              pattern={pattern}
              required={required}
              disabled={disabled}
              onChange={(e) => {
                const value = type === "number" 
                  ? e.target.value === "" ? "" : Number(e.target.value)
                  : e.target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}