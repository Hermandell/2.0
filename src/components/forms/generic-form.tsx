"use client";

import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface GenericFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  submitLabel?: string;
  children: React.ReactNode;
}

export function GenericForm({
  form,
  onSubmit,
  submitLabel = "Submit",
  children,
}: GenericFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {children}
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}