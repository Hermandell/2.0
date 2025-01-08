"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { QueryOptions, Schema } from "@/lib/query-builder/types";

interface QueryOptionsProps {
  schema: Schema;
  options: QueryOptions;
  onOptionsChange: (options: QueryOptions) => void;
}

export function QueryOptions({ schema, options, onOptionsChange }: QueryOptionsProps) {
  const handleLimitChange = (value: string) => {
    const limit = value === '' ? undefined : parseInt(value, 10);
    onOptionsChange({
      ...options,
      limit: limit || 10
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Use limit:</span>
          <Switch
            checked={options.useLimit || false}
            onCheckedChange={(checked) => 
              onOptionsChange({
                ...options,
                useLimit: checked,
                limit: checked ? (options.limit || 10) : undefined
              })
            }
          />
        </div>

        {options.useLimit && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Limit:</span>
            <Input
              type="number"
              min="1"
              value={options.limit || ''}
              onChange={(e) => handleLimitChange(e.target.value)}
              className="w-24"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Order by:</span>
        <Select
          value={options.orderBy?.field || ''}
          onValueChange={(field) => onOptionsChange({
            ...options,
            orderBy: field ? { field, direction: options.orderBy?.direction || 'asc' } : undefined
          })}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(schema).map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {options.orderBy && (
          <Select
            value={options.orderBy.direction}
            onValueChange={(direction: 'asc' | 'desc') => onOptionsChange({
              ...options,
              orderBy: { ...options.orderBy!, direction }
            })}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">ASC</SelectItem>
              <SelectItem value="desc">DESC</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}