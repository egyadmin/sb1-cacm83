import React from 'react';
import { DollarSign, FileText } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

export function BillingSystem() {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'نظام الفواتير' : 'Billing System'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {currentLanguage === 'ar' 
              ? 'إدارة فواتير وتكاليف التسكين'
              : 'Manage housing bills and costs'
            }
          </p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'فاتورة جديدة' : 'New Bill'}
        </button>
      </div>

      {/* Bills List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {/* Add bill list items here */}
        </ul>
      </div>
    </div>
  );
}