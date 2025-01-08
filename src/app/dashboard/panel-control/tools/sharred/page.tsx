"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryCondition } from "@/types/querys/querys-options";
import { QueryBuilder } from "@/components/forms/query-builder/query-builder";
import { SchemaSelector } from "@/components/forms/query-builder/schema-selector";
import { schemas } from "@/schemas/query-options/schemas";

interface SavedQuery {
  id: string;
  name: string;
  schemaName: string;
  conditions: QueryCondition[];
  timestamp: Date;
}

export default function Home() {
  const [selectedSchema, setSelectedSchema] = useState<string>("cliente");
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);

  const handleSaveQuery = (name: string, conditions: QueryCondition[]) => {
    const newQuery: SavedQuery = {
      id: crypto.randomUUID(),
      name,
      schemaName: selectedSchema,
      conditions,
      timestamp: new Date(),
    };
    setSavedQueries([...savedQueries, newQuery]);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-center mb-6">
        <SchemaSelector
          value={selectedSchema}
          onValueChange={setSelectedSchema}
        />
      </div>

      <QueryBuilder
        schema={schemas[selectedSchema]}
        onSave={handleSaveQuery}
        schemaName={selectedSchema}
      />

      {savedQueries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {savedQueries.map((query) => (
                  <Card key={query.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {query.name}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({query.schemaName})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {query.conditions.map((condition, index) => (
                          <div key={index} className="mb-1">
                            {condition.field} {condition.operator}{" "}
                            {condition.value}
                            {condition.value2 ? ` - ${condition.value2}` : ""}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
