"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";
import { useState } from "react";
import { schemas } from "@/lib/query-builder/schemas";
import { Join, JoinType } from "@/lib/query-builder/types";

interface JoinSelectorProps {
  currentSchema: string;
  joins: Join[];
  onJoinsChange: (joins: Join[]) => void;
  onFieldsChange: (fields: string[]) => void;
}

const JOIN_TYPES: JoinType[] = ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN'];

export function JoinSelector({ currentSchema, joins, onJoinsChange, onFieldsChange }: JoinSelectorProps) {
  const availableSchemas = Object.keys(schemas).filter(s => s !== currentSchema);
  const [pendingSchema, setPendingSchema] = useState<string | null>(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const addJoin = () => {
    if (availableSchemas.length === 0) return;
    const targetSchema = availableSchemas[0];
    setPendingSchema(targetSchema);
    setPendingIndex(null);
  };

  const confirmSchemaSelection = (index: number | null) => {
    if (!pendingSchema) return;

    const targetSchema = pendingSchema;
    const firstFieldCurrent = Object.keys(schemas[currentSchema])[0];
    const firstFieldTarget = Object.keys(schemas[targetSchema])[0];

    if (index === null) {
      // Adding new join
      const newJoin: Join = {
        type: 'INNER JOIN',
        schema: targetSchema,
        onField: firstFieldCurrent,
        withField: firstFieldTarget
      };
      onJoinsChange([...joins, newJoin]);
    } else {
      // Updating existing join
      const newJoins = [...joins];
      newJoins[index] = {
        ...newJoins[index],
        schema: targetSchema,
        onField: firstFieldCurrent,
        withField: firstFieldTarget
      };
      onJoinsChange(newJoins);
    }

    // Clear all selected fields when schema changes
    onFieldsChange([]);
    setPendingSchema(null);
    setPendingIndex(null);
  };

  const updateJoin = (index: number, field: keyof Join, value: string) => {
    if (field === 'schema') {
      setPendingSchema(value);
      setPendingIndex(index);
      return;
    }

    const newJoins = [...joins];
    newJoins[index] = { ...newJoins[index], [field]: value };
    onJoinsChange(newJoins);
  };

  const removeJoin = (index: number) => {
    const removedSchema = joins[index].schema;
    onJoinsChange(joins.filter((_, i) => i !== index));
    
    // Remove fields from removed schema and clear selection
    const fieldsToRemove = Object.keys(schemas[removedSchema]).map(
      field => `${removedSchema}.${field}`
    );
    onFieldsChange([]);
  };

  if (availableSchemas.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Joins</CardTitle>
        <Button onClick={addJoin} variant="outline" size="sm">
          Add Join
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {joins.map((join, index) => (
          <div key={index} className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
            <Select
              value={join.type}
              onValueChange={(value) => updateJoin(index, 'type', value as JoinType)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JOIN_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Select
                value={pendingIndex === index ? pendingSchema : join.schema}
                onValueChange={(value) => updateJoin(index, 'schema', value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableSchemas.map((schema) => (
                    <SelectItem key={schema} value={schema}>
                      {schema}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {pendingIndex === index && pendingSchema && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => confirmSchemaSelection(index)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>

            <span className="text-sm text-muted-foreground">ON</span>

            <Select
              value={join.onField}
              onValueChange={(value) => updateJoin(index, 'onField', value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(schemas[currentSchema]).map((field) => (
                  <SelectItem key={field} value={field}>
                    {currentSchema}.{field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-sm text-muted-foreground">=</span>

            <Select
              value={join.withField}
              onValueChange={(value) => updateJoin(index, 'withField', value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(schemas[join.schema]).map((field) => (
                  <SelectItem key={field} value={field}>
                    {join.schema}.{field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeJoin(index)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {pendingSchema && pendingIndex === null && (
          <div className="flex items-center gap-2 mt-2">
            <Select
              value={pendingSchema}
              onValueChange={setPendingSchema}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableSchemas.map((schema) => (
                  <SelectItem key={schema} value={schema}>
                    {schema}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => confirmSchemaSelection(null)}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}