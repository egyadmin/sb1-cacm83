import { useState, useCallback, useMemo } from 'react';

interface UseTableFiltersProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  filterField?: keyof T;
}

export function useTableFilters<T>({ 
  data, 
  searchFields, 
  filterField 
}: UseTableFiltersProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply category/status filter
    if (filterField && selectedFilter !== 'all') {
      filtered = filtered.filter(item => 
        String(item[filterField]) === selectedFilter
      );
    }

    return filtered;
  }, [data, searchQuery, selectedFilter, searchFields, filterField]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilter = useCallback((filter: string) => {
    setSelectedFilter(filter);
  }, []);

  return {
    filteredData,
    searchQuery,
    selectedFilter,
    handleSearch,
    handleFilter,
  };
}