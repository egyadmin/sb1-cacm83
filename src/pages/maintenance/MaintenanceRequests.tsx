import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Filter, 
  Download, 
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { NewMaintenanceModal } from '../../components/maintenance/NewMaintenanceModal';

interface MaintenanceRequest {
  id: string;
  type: 'electrical' | 'plumbing' | 'ac' | 'other';
  location: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  reportedBy: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}

export function MaintenanceRequests() {
  const { currentLanguage } = useLanguageStore();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);

  const handleNewRequest = (formData: any) => {
    const newRequest: MaintenanceRequest = {
      id: `MR-${new Date().getTime()}`,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRequests([newRequest, ...requests]);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    if (currentLanguage === 'ar') {
      switch (status) {
        case 'pending': return 'قيد الانتظار';
        case 'in_progress': return 'قيد التنفيذ';
        case 'completed': return 'مكتمل';
        case 'cancelled': return 'ملغي';
        default: return status;
      }
    }
    return status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1);
  };

  const getTypeText = (type: string) => {
    if (currentLanguage === 'ar') {
      switch (type) {
        case 'electrical': return 'كهرباء';
        case 'plumbing': return 'سباكة';
        case 'ac': return 'تكييف';
        case 'other': return 'أخرى';
        default: return type;
      }
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'طلبات الصيانة' : 'Maintenance Requests'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة ومتابعة طلبات الصيانة'
              : 'Manage and track maintenance requests'
            }
          </p>
        </div>
        <button 
          onClick={() => setShowNewRequestModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'طلب صيانة جديد' : 'New Request'}
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'قيد الانتظار' : 'Pending'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.pending}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.inProgress}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'مكتملة' : 'Completed'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.completed}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'ar' ? 'بحث في الطلبات...' : 'Search requests...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">
                  {currentLanguage === 'ar' ? 'جميع الطلبات' : 'All Requests'}
                </option>
                <option value="pending">
                  {currentLanguage === 'ar' ? 'قيد الانتظار' : 'Pending'}
                </option>
                <option value="in_progress">
                  {currentLanguage === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
                </option>
                <option value="completed">
                  {currentLanguage === 'ar' ? 'مكتملة' : 'Completed'}
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
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'رقم الطلب' : 'Request ID'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'النوع' : 'Type'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الموقع' : 'Location'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTypeText(request.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
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

      {/* New Maintenance Request Modal */}
      {showNewRequestModal && (
        <NewMaintenanceModal
          onClose={() => setShowNewRequestModal(false)}
          onSubmit={handleNewRequest}
        />
      )}
    </div>
  );
}