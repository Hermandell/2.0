"use client";

import { Switch } from "@/components/ui/switch";

interface BooleanInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function BooleanInput({ value, onChange }: BooleanInputProps) {
  return (
    <Switch
      checked={value}
      onCheckedChange={onChange}
    />
  );
}