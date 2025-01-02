export function generateColumnsFromData(data: Record<string, any>[]): any[] {
    if (!data.length) return [];
    
    // Get all unique keys from all objects in the array
    const keys = Array.from(
      new Set(
        data.flatMap(item => Object.keys(item))
      )
    );
    
    return keys.map(key => ({
      id: key,
      label: formatColumnLabel(key)
    }));
  }
  
  function formatColumnLabel(key: string): string {
    return key
      .split(/(?=[A-Z])|_|-/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }