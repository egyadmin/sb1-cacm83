import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useApprovalStore } from '../../store/useApprovalStore';

interface UserApprovalRequest {
  id: string;
  type: 'user_registration';
  requesterId: string;
  requesterName: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalFlow: {
    level: number;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: string;
    approvedAt?: string;
  }[];
  createdAt: string;
}

interface UserApprovalsListProps {
  requests: UserApprovalRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function UserApprovalsList({ requests, onApprove, onReject }: UserApprovalsListProps) {
  const { currentLanguage } = useLanguageStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    if (currentLanguage === 'ar') {
      switch (status) {
        case 'approved': return 'تمت الموافقة';
        case 'rejected': return 'مرفوض';
        default: return 'قيد الانتظار';
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getRoleText = (role: string) => {
    if (currentLanguage === 'ar') {
      switch (role) {
        case 'direct_manager': return 'المدير المباشر';
        case 'housing_manager': return 'مدير قسم الإسكان';
        case 'regional_manager': return 'مدير المنطقة';
        default: return role;
      }
    }
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };

  return (
    <div className="space-y-6">
      {requests.map((request) => (
        <div key={request.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {request.requesterName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(request.createdAt)}
                </p>
              </div>
              <div className="flex items-center">
                {getStatusIcon(request.status)}
                <span className={`ml-2 text-sm font-medium ${
                  request.status === 'approved' ? 'text-green-800' :
                  request.status === 'rejected' ? 'text-red-800' :
                  'text-yellow-800'
                }`}>
                  {getStatusText(request.status)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flow-root">
                <ul className="-mb-8">
                  {request.approvalFlow.map((step, stepIdx) => (
                    <li key={step.level}>
                      <div className="relative pb-8">
                        {stepIdx !== request.approvalFlow.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              step.status === 'approved' ? 'bg-green-500' :
                              step.status === 'rejected' ? 'bg-red-500' :
                              'bg-gray-500'
                            }`}>
                              <span className="text-white text-sm">{step.level}</span>
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-500">
                                {getRoleText(step.role)}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {step.approvedAt && formatDate(step.approvedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {request.status === 'pending' && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => onReject(request.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  {currentLanguage === 'ar' ? 'رفض' : 'Reject'}
                </button>
                <button
                  onClick={() => onApprove(request.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {currentLanguage === 'ar' ? 'موافقة' : 'Approve'}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}