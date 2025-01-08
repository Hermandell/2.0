import { z } from "zod";

export type FieldType = 'string' | 'number' | 'date' | 'boolean';

export type JoinType = 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN';

export interface Join {
  type: JoinType;
  schema: string;
  onField: string;
  withField: string;
}

export interface Schema {
  [key: string]: FieldType;
}

export type Operator = 
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between';

export interface QueryCondition {
  field: string;
  operator: Operator;
  value: string | number | boolean;
  value2?: string | number;
}

export interface QueryOptions {
  useLimit?: boolean;
  limit?: number;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  groupBy?: string;
  joins?: Join[];
}

export const queryFormSchema = z.object({
  queryName: z.string(),
  selectedFields: z.array(z.string()),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.string(),
    value: z.union([z.string(), z.number(), z.boolean()]),
    value2: z.union([z.string(), z.number()]).optional()
  })),
  options: z.object({
    useLimit: z.boolean().optional(),
    limit: z.number().optional(),
    orderBy: z.object({
      field: z.string(),
      direction: z.enum(['asc', 'desc'])
    }).optional(),
    groupBy: z.string().optional(),
    joins: z.array(z.object({
      type: z.enum(['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN']),
      schema: z.string(),
      onField: z.string(),
      withField: z.string()
    })).optional()
  })
});