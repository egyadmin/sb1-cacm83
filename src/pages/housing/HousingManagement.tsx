import React, { useState } from 'react';
import { Building2, Users, FileText, Settings, Plus, Search, Filter, Download } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { HousingChart } from '../../components/housing/HousingChart';
import { ResidentsList } from '../../components/housing/ResidentsList';
import { ComplexManagement } from '../../components/housing/ComplexManagement';
import { BillingSystem } from '../../components/housing/BillingSystem';
import { AccessControl } from '../../components/housing/AccessControl';

export function HousingManagement() {
  const { currentLanguage } = useLanguageStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', icon: Building2, labelAr: 'نظرة عامة', labelEn: 'Overview' },
    { id: 'residents', icon: Users, labelAr: 'المقيمين', labelEn: 'Residents' },
    { id: 'complexes', icon: Building2, labelAr: 'المجمعات', labelEn: 'Complexes' },
    { id: 'billing', icon: FileText, labelAr: 'الفواتير', labelEn: 'Billing' },
    { id: 'access', icon: Settings, labelAr: 'الصلاحيات', labelEn: 'Access Control' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <HousingChart />;
      case 'residents':
        return <ResidentsList />;
      case 'complexes':
        return <ComplexManagement />;
      case 'billing':
        return <BillingSystem />;
      case 'access':
        return <AccessControl />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة الإسكان' : 'Housing Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة المجمعات السكنية والمقيمين والفواتير'
              : 'Manage housing complexes, residents, and billing'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'إضافة جديد' : 'Add New'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {currentLanguage === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'بحث...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              {currentLanguage === 'ar' ? 'تصفية' : 'Filter'}
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              {currentLanguage === 'ar' ? 'تصدير' : 'Export'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}