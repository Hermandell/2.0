"use client";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { QueryCondition, Schema } from '@/lib/query-builder/types';
import { operatorLabels, operatorsByType } from '@/lib/query-builder/operators';
import { BooleanInput } from './fields-inputs/boolean-input';
import { DateInput } from './fields-inputs/date-input';
import { NumberInput } from '../forms-fields/number-input';
import { TextInput } from '../forms-fields/text-input';


interface ConditionFormProps {
  schema: Schema;
  condition: QueryCondition;
  onChange: (condition: QueryCondition) => void;
  onRemove: () => void;
}

export function ConditionForm({ schema, condition, onChange, onRemove }: ConditionFormProps) {
  const fieldType = schema[condition.field];
  const availableOperators = operatorsByType[fieldType] || [];

  const handleValueChange = (value: string | boolean) => {
    onChange({
      ...condition,
      operator: fieldType === 'boolean' ? 'equals' : condition.operator,
      value: fieldType === 'number' && typeof value === 'string' ? 
        (value === '' ? '' : Number(value)) : 
        value
    });
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      <Select value={condition.field} onValueChange={(field) => onChange({ ...condition, field })}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(schema).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {fieldType !== 'boolean' && (
        <Select 
          value={condition.operator} 
          onValueChange={(operator) => onChange({ ...condition, operator })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {availableOperators.map((op) => (
              <SelectItem key={op} value={op}>
                {operatorLabels[op]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {fieldType === 'boolean' ? (
        <BooleanInput
          value={Boolean(condition.value)}
          onChange={handleValueChange}
        />
      ) : fieldType === 'date' ? (
        <DateInput
          value={String(condition.value || '')}
          onChange={handleValueChange}
        />
      ) : fieldType === 'number' ? (
        <>
          <NumberInput
            value={String(condition.value || '')}
            onChange={handleValueChange}
          />
          {condition.operator === 'between' && (
            <NumberInput
              value={String(condition.value2 || '')}
              onChange={(newValue) => {
                onChange({
                  ...condition,
                  value2: newValue === '' ? '' : Number(newValue)
                });
              }}
              isSecondValue
            />
          )}
        </>
      ) : (
        <TextInput
          value={String(condition.value || '')}
          onChange={handleValueChange}
        />
      )}

      <Button variant="destructive" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}