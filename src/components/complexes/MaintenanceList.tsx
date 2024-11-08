import React from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Tool } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface MaintenanceRequest {
  id: string;
  type: 'electrical' | 'plumbing' | 'ac' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  location: string;
  reportedBy: string;
  reportedAt: string;
  updatedAt: string;
}

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
  onUpdateStatus: (requestId: string, status: MaintenanceRequest['status']) => void;
}

export function MaintenanceList({ requests, onUpdateStatus }: MaintenanceListProps) {
  const { currentLanguage } = useLanguageStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Tool className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    if (currentLanguage === 'ar') {
      switch (status) {
        case 'completed': return 'مكتمل';
        case 'in_progress': return 'قيد التنفيذ';
        case 'cancelled': return 'ملغي';
        case 'pending': return 'معلق';
        default: return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
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

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {requests.map((request) => (
          <li key={request.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(request.status)}
                  <p className="ml-2 text-sm font-medium text-gray-900">
                    {getTypeText(request.type)}
                  </p>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(request.priority)}`}>
                    {currentLanguage === 'ar' 
                      ? request.priority === 'urgent' ? 'طارئ' 
                        : request.priority === 'high' ? 'عالي'
                        : request.priority === 'medium' ? 'متوسط'
                        : 'منخفض'
                      : request.priority.charAt(0).toUpperCase() + request.priority.slice(1)
                    }
                  </span>
                </div>
                <div className="flex items-center">
                  {request.status !== 'completed' && request.status !== 'cancelled' && (
                    <select
                      value={request.status}
                      onChange={(e) => onUpdateStatus(request.id, e.target.value as MaintenanceRequest['status'])}
                      className="ml-2 text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="pending">{currentLanguage === 'ar' ? 'معلق' : 'Pending'}</option>
                      <option value="in_progress">{currentLanguage === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
                      <option value="completed">{currentLanguage === 'ar' ? 'مكتمل' : 'Completed'}</option>
                      <option value="cancelled">{currentLanguage === 'ar' ? 'ملغي' : 'Cancelled'}</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {request.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {currentLanguage === 'ar' ? 'تم الإبلاغ بواسطة' : 'Reported by'}: {request.reportedBy}
                  </p>
                  <p className="ml-2">
                    {formatDate(request.reportedAt)}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  {currentLanguage === 'ar' ? 'الموقع' : 'Location'}: {request.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}