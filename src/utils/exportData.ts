export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers: { [K in keyof T]?: string }
) {
  // Convert data to CSV format
  const csvHeaders = Object.values(headers).join(',');
  const csvRows = data.map(row => {
    return Object.keys(headers)
      .map(key => {
        const value = row[key];
        // Handle special cases (objects, arrays, etc.)
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${value}"`;
      })
      .join(',');
  });

  const csvContent = [csvHeaders, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    // Other browsers
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}