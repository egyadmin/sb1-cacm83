import React, { useState } from 'react';
import { ClipboardCheck, Search, Filter, Download, CheckCircle, XCircle, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useApprovalStore, ApprovalRequest } from '../store/useApprovalStore';
import { useLanguageStore } from '../store/useLanguageStore';

const approvalTypes = [
  { id: 'all', name: 'All Requests', nameAr: 'جميع الطلبات' },
  { id: 'direct-manager', name: 'Direct Manager Approval', nameAr: 'موافقة المدير المباشر' },
  { id: 'regional-manager', name: 'Regional Manager Approval', nameAr: 'موافقة مدير المنطقة' },
  { id: 'branch-manager', name: 'Branch Manager Approval', nameAr: 'موافقة مدير الفرع' },
];

const approvalStatuses = [
  { id: 'pending', name: 'Pending', nameAr: 'معلق', icon: Clock, color: 'text-yellow-500' },
  { id: 'approved', name: 'Approved', nameAr: 'تمت الموافقة', icon: CheckCircle, color: 'text-green-500' },
  { id: 'rejected', name: 'Rejected', nameAr: 'مرفوض', icon: XCircle, color: 'text-red-500' },
];

export function Approvals() {
  const { currentLanguage } = useLanguageStore();
  const { requests, updateRequest } = useApprovalStore();
  const [selectedType, setSelectedType] = useState('all');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const handleAction = (request: ApprovalRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setShowActionModal(true);
  };

  const confirmAction = (action: 'approve' | 'reject') => {
    if (selectedRequest) {
      updateRequest(selectedRequest.id, action === 'approve' ? 'approved' : 'rejected');
    }
    setShowActionModal(false);
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'طلبات الموافقة' : 'Approval Requests'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' ? 'إدارة طلبات الموافقة على مختلف المستويات' : 'Manage approval requests across different levels'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {approvalStatuses.map((status) => (
          <div key={status.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <status.icon className={`h-8 w-8 ${status.color}`} />
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  {currentLanguage === 'ar' ? status.nameAr : status.name}
                </h3>
              </div>
              <span className="text-2xl font-semibold text-gray-900">
                {status.id === 'pending' ? pendingCount : 
                 status.id === 'approved' ? approvedCount : rejectedCount}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'ar' ? 'بحث في الطلبات...' : 'Search requests...'}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {approvalTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {currentLanguage === 'ar' ? type.nameAr : type.name}
                  </option>
                ))}
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
                    {currentLanguage === 'ar' ? 'مقدم الطلب' : 'Requester'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المستوى الحالي' : 'Current Level'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requester}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.currentLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {currentLanguage === 'ar' ? 'في انتظار موافقة' : 'Pending'} {request.currentLevel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleAction(request, 'approve')}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {currentLanguage === 'ar' ? 'موافقة' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleAction(request, 'reject')}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          {currentLanguage === 'ar' ? 'رفض' : 'Reject'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showActionModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'تأكيد الإجراء' : 'Confirm Action'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {currentLanguage === 'ar'
                ? `هل أنت متأكد من أنك تريد ${selectedRequest.status === 'approve' ? 'الموافقة على' : 'رفض'} هذا الطلب؟`
                : `Are you sure you want to ${selectedRequest.status === 'approve' ? 'approve' : 'reject'} this request?`}
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {currentLanguage === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => confirmAction('approve')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                {currentLanguage === 'ar' ? 'تأكيد الموافقة' : 'Confirm Approve'}
              </button>
              <button
                onClick={() => confirmAction('reject')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                {currentLanguage === 'ar' ? 'تأكيد الرفض' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}