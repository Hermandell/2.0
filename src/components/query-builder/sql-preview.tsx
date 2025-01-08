"use client";

import { operatorToSQL } from "@/lib/query-builder/sql-helpers";
import { QueryCondition, QueryOptions } from "@/lib/query-builder/types";

interface SQLPreviewProps {
  schemaName: string;
  selectedFields: string[];
  conditions: QueryCondition[];
  options: QueryOptions;
}

export function SQLPreview({ schemaName, selectedFields, conditions, options }: SQLPreviewProps) {
  const buildSQL = () => {
    const lines = [];
    
    // SELECT clause
    const fields = selectedFields.length > 0 
      ? selectedFields.map(field => {
          // If the field already includes a schema prefix (e.g., "rules.id"), use it as is
          if (field.includes('.')) {
            return field;
          }
          // Otherwise, prefix it with the current schema name
          return `${schemaName}.${field}`;
        }).join(', ')
      : `${schemaName}.*`;
    lines.push(`SELECT ${fields}`);
    
    // FROM clause
    lines.push(`FROM ${schemaName}`);
    
    // JOIN clauses
    if (options.joins?.length) {
      options.joins.forEach(join => {
        lines.push(`${join.type} ${join.schema} ON ${schemaName}.${join.onField} = ${join.schema}.${join.withField}`);
      });
    }
    
    // WHERE clause
    if (conditions.length > 0) {
      const whereConditions = conditions.map(condition => {
        const operator = operatorToSQL(condition.operator);
        const fieldWithSchema = condition.field.includes('.') 
          ? condition.field 
          : `${schemaName}.${condition.field}`;
        
        if (condition.operator === 'between') {
          return `${fieldWithSchema} ${operator} ${condition.value} AND ${condition.value2}`;
        }
        
        const value = typeof condition.value === 'boolean' 
          ? condition.value.toString() 
          : typeof condition.value === 'string' 
            ? `'${condition.value}'` 
            : condition.value;
            
        return `${fieldWithSchema} ${operator} ${value}`;
      });
      
      lines.push(`WHERE ${whereConditions.join('\n  AND ')}`);
    }
    
    // ORDER BY clause
    if (options.orderBy) {
      const orderByField = options.orderBy.field.includes('.')
        ? options.orderBy.field
        : `${schemaName}.${options.orderBy.field}`;
      lines.push(`ORDER BY ${orderByField} ${options.orderBy.direction.toUpperCase()}`);
    }
    
    // LIMIT clause
    if (options.useLimit && options.limit) {
      lines.push(`LIMIT ${options.limit}`);
    }
    
    return lines.join('\n');
  };

  return (
    <div className="font-mono text-sm">
      <pre className="whitespace-pre-wrap text-primary">{buildSQL()}</pre>
    </div>
  );
}