"use client";

import { Input } from "@/components/ui/input";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSecondValue?: boolean;
}

export function NumberInput({ value, onChange, placeholder, isSecondValue }: NumberInputProps) {
  return (
    <Input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
          onChange(newValue);
        }
      }}
      placeholder={placeholder || (isSecondValue ? "End value" : "Enter number")}
    />
  );
}