import { FieldType, Operator } from './types';

export const operatorsByType: Record<FieldType, Operator[]> = {
  string: ['equals', 'notEquals', 'contains', 'startsWith', 'endsWith'],
  number: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'between'],
  date: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'between'],
  boolean: []  // Boolean fields don't need operators
};

export const operatorLabels: Record<Operator, string> = {
  equals: 'Equals',
  notEquals: 'Not Equals',
  contains: 'Contains',
  startsWith: 'Starts With',
  endsWith: 'Ends With',
  greaterThan: 'Greater Than',
  lessThan: 'Less Than',
  greaterThanOrEqual: 'Greater Than or Equal',
  lessThanOrEqual: 'Less Than or Equal',
  between: 'Between'
};