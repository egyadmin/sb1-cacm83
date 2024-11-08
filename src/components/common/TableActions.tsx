import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface TableActionsProps {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onExport: () => void;
  searchPlaceholder?: string;
  filterOptions?: Array<{
    value: string;
    labelAr: string;
    labelEn: string;
  }>;
  selectedFilter?: string;
}

export function TableActions({
  onSearch,
  onFilter,
  onExport,
  searchPlaceholder,
  filterOptions,
  selectedFilter = 'all'
}: TableActionsProps) {
  const { currentLanguage } = useLanguageStore();

  const handleExport = () => {
    onExport();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="relative flex-grow max-w-lg">
        <Search className={`absolute ${currentLanguage === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
        <input
          type="text"
          placeholder={searchPlaceholder || (currentLanguage === 'ar' ? 'بحث...' : 'Search...')}
          onChange={(e) => onSearch(e.target.value)}
          className={`block w-full ${currentLanguage === 'ar' ? 'pr-10' : 'pl-10'} py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
      </div>
      <div className="flex items-center gap-4">
        {filterOptions && (
          <select
            value={selectedFilter}
            onChange={(e) => onFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">
              {currentLanguage === 'ar' ? 'الكل' : 'All'}
            </option>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {currentLanguage === 'ar' ? option.labelAr : option.labelEn}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={() => onFilter(selectedFilter)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          {currentLanguage === 'ar' ? 'تصفية' : 'Filter'}
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          {currentLanguage === 'ar' ? 'تصدير' : 'Export'}
        </button>
      </div>
    </div>
  );
}