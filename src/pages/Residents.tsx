import React, { useState } from 'react';
import { Users, Search, Filter, Download, UserPlus } from 'lucide-react';
import { useResidentStore } from '../store/useResidentStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useComplexStore } from '../store/useComplexStore';
import { AddResidentModal } from '../components/residents/AddResidentModal';

export function Residents() {
  const { currentLanguage } = useLanguageStore();
  const { residents } = useResidentStore();
  const { complexes } = useComplexStore();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredResidents = residents.filter(resident => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      resident.name.toLowerCase().includes(term) ||
      resident.employeeId.toLowerCase().includes(term) ||
      resident.iqamaNumber.toLowerCase().includes(term)
    );

    const matchesFilter = selectedFilter === 'all' || resident.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getComplexName = (complexId: string) => {
    const complex = complexes.find(c => c.id === complexId);
    return currentLanguage === 'ar' ? complex?.name : complex?.nameEn;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'checked_out':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    if (currentLanguage === 'ar') {
      switch (status) {
        case 'active': return 'نشط';
        case 'checked_out': return 'تم الإخلاء';
        default: return status;
      }
    }
    return status === 'checked_out' ? 'Checked Out' : status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة المقيمين' : 'Residents Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' ? 'إدارة سجلات المقيمين' : 'Manage resident records'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'إضافة مقيم' : 'Add Resident'}
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'المقيمين النشطين' : 'Active Residents'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {residents.filter(r => r.status === 'active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'بحث في المقيمين...' : 'Search residents...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">
                {currentLanguage === 'ar' ? 'جميع المقيمين' : 'All Residents'}
              </option>
              <option value="active">
                {currentLanguage === 'ar' ? 'نشط' : 'Active'}
              </option>
              <option value="checked_out">
                {currentLanguage === 'ar' ? 'تم الإخلاء' : 'Checked Out'}
              </option>
            </select>
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

      {/* Residents Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المهنة' : 'Job Title'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المجمع' : 'Complex'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'تاريخ التسجيل' : 'Registration Date'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResidents.map((resident) => (
                  <tr key={resident.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resident.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resident.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resident.iqamaNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resident.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getComplexName(resident.complexId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(resident.status)}`}>
                        {getStatusText(resident.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(resident.checkInDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        {currentLanguage === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddResidentModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}