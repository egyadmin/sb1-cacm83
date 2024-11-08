import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useApprovalStore } from '../../store/useApprovalStore';

interface ApprovalsListProps {
  onClose: () => void;
}

export function ApprovalsList({ onClose }: ApprovalsListProps) {
  const { currentLanguage } = useLanguageStore();
  const { requests, updateRequest } = useApprovalStore();

  const handleApproval = (requestId: string, approved: boolean) => {
    updateRequest(requestId, approved ? 'approved' : 'rejected');
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'طلبات الموافقة' : 'Approval Requests'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {currentLanguage === 'ar' 
                      ? getRequestTypeArabic(request.type)
                      : getRequestTypeEnglish(request.type)
                    }
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {request.details.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproval(request.id, true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {currentLanguage === 'ar' ? 'موافقة' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleApproval(request.id, false)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    {currentLanguage === 'ar' ? 'رفض' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getRequestTypeArabic(type: string): string {
  switch (type) {
    case 'create_complex': return 'إنشاء مجمع سكني';
    case 'delete_complex': return 'حذف مجمع سكني';
    case 'modify_unit': return 'تعديل وحدة سكنية';
    case 'resident_transfer': return 'نقل مقيم';
    default: return type;
  }
}

function getRequestTypeEnglish(type: string): string {
  switch (type) {
    case 'create_complex': return 'Create Complex';
    case 'delete_complex': return 'Delete Complex';
    case 'modify_unit': return 'Modify Unit';
    case 'resident_transfer': return 'Resident Transfer';
    default: return type;
  }
}