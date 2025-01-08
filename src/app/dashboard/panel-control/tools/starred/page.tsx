"use client";

import { QueryBuilder } from '@/components/query-builder/query-builder';
import { SchemaSelector } from '@/components/query-builder/schema-selector';
import { schemas } from '@/lib/query-builder/schemas';
import { QueryCondition } from '@/lib/query-builder/types';
import { useState } from 'react';


interface SavedQuery {
  id: string;
  name: string;
  schemaName: string;
  conditions: QueryCondition[];
  timestamp: Date;
}

export default function Home() {
  const [selectedSchema, setSelectedSchema] = useState<string>('cliente');
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [key, setKey] = useState(0); // Key for forcing QueryBuilder reset

  const handleSchemaChange = (newSchema: string) => {
    setSelectedSchema(newSchema);
    setKey(prev => prev + 1); // Force QueryBuilder to reset
  };

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
          onValueChange={handleSchemaChange}
          hasChanges={savedQueries.length > 0}
        />
      </div>

      <QueryBuilder 
        key={key} // Force component to reset when schema changes
        schema={schemas[selectedSchema]} 
        onSave={handleSaveQuery}
        schemaName={selectedSchema}
      />
    </div>
  );
}