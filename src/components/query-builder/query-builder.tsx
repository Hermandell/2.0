"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { sampleData } from '@/data/sample-data';
import { QueryCondition, queryFormSchema, Schema } from '@/lib/query-builder/types';
import { JoinSelector } from './join-selector';
import { FieldSelector } from './field-selector';
import { ConditionForm } from '../forms/query-builder-forms/condition-form';
import { QueryPreview } from './query-preview';
import { QueryOptions } from './query-options';
import { DEFAULT_QUERY_OPTIONS } from '@/lib/query-builder/constants';
import { SaveQueryDialog } from './save-query-dialog';
import { QueryResults } from './query-results';


interface QueryBuilderProps {
  schema: Schema;
  schemaName: string;
  onSave: (name: string, conditions: QueryCondition[]) => void;
}

export function QueryBuilder({ schema, schemaName, onSave }: QueryBuilderProps) {
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [displayedColumns, setDisplayedColumns] = useState<string[]>([]);
  const [isQueryExecuted, setIsQueryExecuted] = useState(false);

  const form = useForm({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      queryName: '',
      selectedFields: [],
      conditions: [],
      options: {
        ...DEFAULT_QUERY_OPTIONS,
        joins: []
      }
    }
  });

  const handleSave = () => {
    if (!form.getValues('queryName').trim()) {
      alert('Please enter a query name');
      return;
    }
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    onSave(form.getValues('queryName'), form.getValues('conditions'));
    form.reset();
    setQueryResults(null);
    setShowSaveDialog(false);
    setDisplayedColumns([]);
    setIsQueryExecuted(false);
  };

  const clearFields = () => {
    form.setValue('selectedFields', []);
    setDisplayedColumns([]);
    setQueryResults(null);
    setIsQueryExecuted(false);
  };

  const executeQuery = async () => {
    const formData = form.getValues();
    let results = [...sampleData[schemaName as keyof typeof sampleData]].map(item => {
      // Add schema prefix to all fields in the main schema
      const itemWithSchema: any = {};
      Object.entries(item).forEach(([key, value]) => {
        itemWithSchema[`${schemaName}.${key}`] = value;
      });
      return itemWithSchema;
    });

    // Handle joins
    if (formData.options.joins && formData.options.joins.length > 0) {
      results = results.map(mainRecord => {
        let joinedRecord = { ...mainRecord };
        formData.options.joins?.forEach(join => {
          const joinedData = sampleData[join.schema as keyof typeof sampleData];
          const joinedItem = joinedData.find(item => 
            item[join.withField] === mainRecord[`${schemaName}.${join.onField}`]
          );
          if (joinedItem) {
            Object.keys(joinedItem).forEach(key => {
              joinedRecord[`${join.schema}.${key}`] = joinedItem[key];
            });
          }
        });
        return joinedRecord;
      });
    }

    // Apply conditions
    if (formData.conditions.length > 0) {
      results = results.filter(item => 
        formData.conditions.every(condition => {
          const fieldWithSchema = condition.field.includes('.') 
            ? condition.field 
            : `${schemaName}.${condition.field}`;
          return evaluateCondition(item, { ...condition, field: fieldWithSchema });
        })
      );
    }

    // Apply ordering
    if (formData.options.orderBy) {
      const orderByField = formData.options.orderBy.field.includes('.')
        ? formData.options.orderBy.field
        : `${schemaName}.${formData.options.orderBy.field}`;
      
      results.sort((a, b) => {
        const aValue = a[orderByField];
        const bValue = b[orderByField];
        const modifier = formData.options.orderBy!.direction === 'asc' ? 1 : -1;
        return aValue > bValue ? modifier : -modifier;
      });
    }

    // Apply limit
    if (formData.options.useLimit && formData.options.limit) {
      results = results.slice(0, formData.options.limit);
    }

    setQueryResults(results);
    setIsQueryExecuted(true);
    setDisplayedColumns(formData.selectedFields.length > 0 
      ? formData.selectedFields 
      : Object.keys(schema).map(field => `${schemaName}.${field}`));
  };

  const evaluateCondition = (item: any, condition: QueryCondition): boolean => {
    const value = item[condition.field];
    
    switch (condition.operator) {
      case 'equals':
        return value === condition.value;
      case 'notEquals':
        return value !== condition.value;
      case 'contains':
        return String(value).toLowerCase().includes(String(condition.value).toLowerCase());
      case 'startsWith':
        return String(value).toLowerCase().startsWith(String(condition.value).toLowerCase());
      case 'endsWith':
        return String(value).toLowerCase().endsWith(String(condition.value).toLowerCase());
      case 'greaterThan':
        return value > condition.value;
      case 'lessThan':
        return value < condition.value;
      case 'greaterThanOrEqual':
        return value >= condition.value;
      case 'lessThanOrEqual':
        return value <= condition.value;
      case 'between':
        return value >= condition.value && value <= condition.value2;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Query Builder</CardTitle>
          <div className="flex gap-4">
            <Input
              placeholder="Query Name"
              value={form.watch('queryName')}
              onChange={(e) => form.setValue('queryName', e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleSave}>Save Query</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <JoinSelector
          currentSchema={schemaName}
          joins={form.watch('options.joins') || []}
          onJoinsChange={(joins) => {
            form.setValue('options.joins', joins);
            clearFields();
          }}
          onFieldsChange={(fields) => {
            form.setValue('selectedFields', fields);
          }}
        />

        <Separator />

        <FieldSelector
          schema={schema}
          selectedFields={form.watch('selectedFields')}
          onFieldsChange={(fields) => {
            form.setValue('selectedFields', fields);
          }}
          joins={form.watch('options.joins') || []}
          currentSchema={schemaName}
        />

        <Separator />

        <div className="space-y-4">
          {form.watch('conditions').map((condition, index) => (
            <ConditionForm
              key={index}
              schema={schema}
              condition={condition}
              schemaName={schemaName}
              onChange={(newCondition) => {
                const conditions = form.getValues('conditions');
                conditions[index] = newCondition;
                form.setValue('conditions', conditions);
              }}
              onRemove={() => {
                const conditions = form.getValues('conditions').filter((_, i) => i !== index);
                form.setValue('conditions', conditions);
              }}
            />
          ))}
          
          <Button 
            onClick={() => {
              const conditions = form.getValues('conditions');
              const [firstField] = Object.keys(schema);
              form.setValue('conditions', [...conditions, {
                field: `${schemaName}.${firstField}`,
                operator: 'equals',
                value: '',
              }]);
            }} 
            variant="outline"
          >
            Add Condition
          </Button>
        </div>

        <Separator />

        <QueryOptions
          schema={schema}
          options={form.watch('options')}
          onOptionsChange={(options) => form.setValue('options', options)}
          schemaName={schemaName}
        />

        <QueryPreview 
          schemaName={schemaName}
          selectedFields={form.watch('selectedFields')}
          conditions={form.watch('conditions')}
          options={form.watch('options')}
        />

        <div className="flex justify-center mt-6">
          <Button onClick={executeQuery} size="lg">
            Execute Query
          </Button>
        </div>

        {isQueryExecuted && queryResults && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Query Results</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryResults 
                data={queryResults} 
                columns={displayedColumns}
              />
            </CardContent>
          </Card>
        )}

        <SaveQueryDialog
          open={showSaveDialog}
          onOpenChange={setShowSaveDialog}
          onConfirm={confirmSave}
          queryName={form.watch('queryName')}
        />
      </CardContent>
    </Card>
  );
}