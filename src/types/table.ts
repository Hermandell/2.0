export interface GenericData {
    [key: string]: any;
  }
  
  export interface ColumnConfig {
    id: string;
    label: string;
    type: 'text' | 'date' | 'badge' | 'status';
    filterable?: boolean;
    sortable?: boolean;
    filterType?: 'text' | 'date' | 'select';
    options?: { label: string; value: string; }[];
  }