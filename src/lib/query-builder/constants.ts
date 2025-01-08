export const DEFAULT_QUERY_OPTIONS = {
    useLimit: false,
    limit: undefined,
    orderBy: undefined
  } as const;
  
  export const SORT_DIRECTIONS = {
    ASC: 'asc',
    DESC: 'desc'
  } as const;