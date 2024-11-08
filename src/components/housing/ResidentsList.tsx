import React, { useState } from 'react';
import { Users, Search, Filter, Download, UserPlus, ArrowRightLeft } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResidentStore } from '../../store/useResidentStore';
import { AddResidentModal } from './AddResidentModal';
import { TransferResidentModal } from './TransferResidentModal';
import { ResidentDetails } from './ResidentDetails';

export function ResidentsList() {
  const { currentLanguage } = useLanguageStore();
  const { residents } = useResidentStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'temporary': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    if (currentLanguage === 'ar') {
      switch (status) {
        case 'active': return 'نشط';
        case 'temporary': return 'مؤقت';
        case 'inactive': return 'غير نشط';
        default: return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredResidents = residents.filter(resident => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      resident.name.toLowerCase().includes(term) ||
      resident.employeeId.toLowerCase().includes(term)
    );
    const matchesFilter = filterStatus === 'all' || resident.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة المقيمين' : 'Resident Management'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {currentLanguage === 'ar' 
              ? 'إدارة المقيمين وتحويلاتهم'
              : 'Manage residents and their transfers'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTransferModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowRightLeft className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'نقل مقيم' : 'Transfer Resident'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'إضافة مقيم' : 'Add Resident'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'بحث في المقيمين...' : 'Search residents...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">
                {currentLanguage === 'ar' ? 'جميع المقيمين' : 'All Residents'}
              </option>
              <option value="active">
                {currentLanguage === 'ar' ? 'نشط' : 'Active'}
              </option>
              <option value="temporary">
                {currentLanguage === 'ar' ? 'مؤقت' : 'Temporary'}
              </option>
              <option value="inactive">
                {currentLanguage === 'ar' ? 'غير نشط' : 'Inactive'}
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
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المجمع' : 'Complex'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'تاريخ التسكين' : 'Check-in Date'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResidents.map((resident) => (
                  <tr key={resident.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resident.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resident.complexName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(resident.status)}`}>
                        {getStatusText(resident.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(resident.checkInDate).toLocaleDateString(
                        currentLanguage === 'ar' ? 'ar-SA' : 'en-US'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedResident(resident.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
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

      {/* Modals */}
      {showAddModal && (
        <AddResidentModal onClose={() => setShowAddModal(false)} />
      )}
      {showTransferModal && (
        <TransferResidentModal onClose={() => setShowTransferModal(false)} />
      )}
      {selectedResident && (
        <ResidentDetails
          residentId={selectedResident}
          onClose={() => setSelectedResident(null)}
        />
      )}
    </div>
  );
}