"use client";

import { Input } from "@/components/ui/input";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ value, onChange }: DateInputProps) {
  return (
    <Input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}