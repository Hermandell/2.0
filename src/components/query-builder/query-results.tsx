"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from "lucide-react";

interface QueryResultsProps {
  data: any[];
  columns: string[];
}

export function QueryResults({ data, columns }: QueryResultsProps) {
  const renderCellContent = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      );
    }
    return String(value);
  };

  const formatColumnHeader = (column: string, data: any[]) => {
    // If column already includes schema name (contains a dot), use it as is
    if (column.includes('.')) {
      return column;
    }
    
    // Otherwise, try to determine the schema from the first data row
    if (data.length > 0) {
      const firstRow = data[0];
      // Get the schema name from the object key that contains this column
      for (const key of Object.keys(firstRow)) {
        if (key.endsWith(`.${column}`)) {
          return key;
        }
      }
    }
    
    // If we can't determine the schema, use the column name as is
    return column;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>
                {formatColumnHeader(column, data)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column} className="text-center">
                  {renderCellContent(row[column])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}