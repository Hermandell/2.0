"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { schemas } from "@/lib/query-builder/schemas";

interface SchemaSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  hasChanges: boolean;
}

export function SchemaSelector({ value, onValueChange, hasChanges }: SchemaSelectorProps) {
  const [selectedSchema, setSelectedSchema] = useState(value);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelect = async () => {
    if (selectedSchema === value) return;
    
    if (hasChanges) {
      setShowConfirm(true);
    } else {
      confirmSchemaChange();
    }
  };

  const confirmSchemaChange = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onValueChange(selectedSchema);
    setLoading(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Select 
          value={selectedSchema} 
          onValueChange={setSelectedSchema}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select schema" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(schemas).map((schemaName) => (
              <SelectItem key={schemaName} value={schemaName}>
                {schemaName.charAt(0).toUpperCase() + schemaName.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSelect} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Select Schema'
          )}
        </Button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={confirmSchemaChange}
        title="Unsaved Changes"
        description="You have unsaved changes in your current query. Are you sure you want to switch schemas? This action cannot be undone."
        confirmText="Switch Schema"
        cancelText="Keep Current Schema"
      />
    </>
  );
}