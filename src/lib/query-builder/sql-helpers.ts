export function operatorToSQL(operator: string): string {
    const operatorMap: Record<string, string> = {
      equals: '=',
      notEquals: '!=',
      contains: 'LIKE',
      startsWith: 'LIKE',
      endsWith: 'LIKE',
      greaterThan: '>',
      lessThan: '<',
      greaterThanOrEqual: '>=',
      lessThanOrEqual: '<=',
      between: 'BETWEEN'
    };
    
    return operatorMap[operator] || '=';
  }
  
  export function buildSQLQuery(
    schemaName: string,
    selectedFields: string[],
    conditions: any[],
    options: any
  ): string {
    const lines = [];
    
    // SELECT clause
    const fields = selectedFields.length > 0 
      ? selectedFields.map(field => {
          if (field.includes('.')) {
            return field;
          }
          return `${schemaName}.${field}`;
        }).join(', ')
      : `${schemaName}.*`;
    lines.push(`SELECT ${fields}`);
    
    // FROM clause
    lines.push(`FROM ${schemaName}`);
    
    // JOIN clauses
    if (options.joins?.length) {
      options.joins.forEach((join: any) => {
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
    
    // GROUP BY clause
    if (options.groupBy) {
      const groupByField = options.groupBy.includes('.')
        ? options.groupBy
        : `${schemaName}.${options.groupBy}`;
      lines.push(`GROUP BY ${groupByField}`);
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
  }