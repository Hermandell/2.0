"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { schemas } from '@/lib/query-builder/schemas';
import { Schema } from '@/lib/query-builder/types';
import { Check, X } from 'lucide-react';

interface FieldSelectorProps {
  schema: Schema;
  selectedFields: string[];
  onFieldsChange: (fields: string[]) => void;
  joins: Array<{ schema: string }>;
  currentSchema: string;
}

export function FieldSelector({ schema, selectedFields, onFieldsChange, joins, currentSchema }: FieldSelectorProps) {
  const toggleField = (schemaName: string, field: string) => {
    const fullField = `${schemaName}.${field}`;
    if (selectedFields.includes(fullField)) {
      onFieldsChange(selectedFields.filter(f => f !== fullField));
    } else {
      onFieldsChange([...selectedFields, fullField]);
    }
  };

  const selectAll = () => {
    const allFields = [
      ...Object.keys(schema).map(field => `${currentSchema}.${field}`),
      ...joins.flatMap(join => 
        Object.keys(schemas[join.schema]).map(field => `${join.schema}.${field}`)
      )
    ];
    onFieldsChange(allFields);
  };

  const clearAll = () => onFieldsChange([]);

  const renderSchemaFields = (schemaName: string, schemaFields: Schema) => (
    <div key={schemaName} className="mb-4">
      <h4 className="text-sm font-medium mb-2">{schemaName === currentSchema ? 'Main Fields' : `${schemaName} Fields`}</h4>
      <div className="space-y-2">
        {Object.entries(schemaFields).map(([field, type]) => {
          const fullField = `${schemaName}.${field}`;
          return (
            <Badge
              key={fullField}
              variant={selectedFields.includes(fullField) ? "default" : "outline"}
              className="mr-2 cursor-pointer"
              onClick={() => toggleField(schemaName, field)}
            >
              {selectedFields.includes(fullField) ? (
                <Check className="mr-1 h-3 w-3" />
              ) : (
                <X className="mr-1 h-3 w-3" />
              )}
              {fullField}
              <span className="ml-1 opacity-50">({type})</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Select Fields</h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[200px]">
        {renderSchemaFields(currentSchema, schema)}
        {joins.map(join => renderSchemaFields(join.schema, schemas[join.schema]))}
      </ScrollArea>
    </Card>
  );
}