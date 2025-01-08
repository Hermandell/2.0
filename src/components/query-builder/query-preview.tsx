"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code } from "lucide-react";
import { SQLPreview } from "./sql-preview";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { QueryCondition, QueryOptions } from "@/lib/query-builder/types";
import { sampleData } from "@/data/sample-data";

interface QueryPreviewProps {
  schemaName: string;
  selectedFields: string[];
  conditions: QueryCondition[];
  options: QueryOptions;
}

export function QueryPreview({ schemaName, selectedFields, conditions, options }: QueryPreviewProps) {
  const [showSQL, setShowSQL] = useState(false);

  if (!sampleData[schemaName as keyof typeof sampleData]?.length) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSQL(!showSQL)}
          className="flex items-center gap-2"
        >
          <Code className="h-4 w-4" />
          {showSQL ? "Hide SQL" : "Show SQL"}
        </Button>
      </div>

      <Collapsible open={showSQL} onOpenChange={setShowSQL}>
        <CollapsibleContent>
          <Card className="p-2 bg-muted/50 mb-4">
            <SQLPreview 
              schemaName={schemaName}
              selectedFields={selectedFields}
              conditions={conditions}
              options={options}
            />
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}