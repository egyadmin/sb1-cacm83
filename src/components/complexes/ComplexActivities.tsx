import React from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useMaintenanceStore } from '../../store/useMaintenanceStore';
import { formatDistanceToNow } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';

interface ComplexActivitiesProps {
  complexId: string;
}

export function ComplexActivities({ complexId }: ComplexActivitiesProps) {
  const { currentLanguage } = useLanguageStore();
  const { getMaintenanceRequestsByComplex, getHousingActionsByComplex } = useMaintenanceStore();

  const maintenanceRequests = getMaintenanceRequestsByComplex(complexId);
  const housingActions = getHousingActionsByComplex(complexId);

  // Combine and sort all activities by date
  const allActivities = [
    ...maintenanceRequests.map(req => ({
      type: 'maintenance',
      date: req.createdAt,
      data: req
    })),
    ...housingActions.map(action => ({
      type: 'housing',
      date: action.date,
      data: action
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityMessage = (activity: typeof allActivities[0]) => {
    if (activity.type === 'maintenance') {
      const request = activity.data;
      return currentLanguage === 'ar'
        ? `طلب صيانة ${request.type} من ${request.requestedBy}`
        : `Maintenance request for ${request.type} by ${request.requestedBy}`;
    } else {
      const action = activity.data;
      return currentLanguage === 'ar'
        ? `${action.type === 'check_in' ? 'تسكين' : 'إخلاء'} للموظف ${action.residentId}`
        : `${action.type === 'check_in' ? 'Check-in' : 'Check-out'} for employee ${action.residentId}`;
    }
  };

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: currentLanguage === 'ar' ? arSA : enUS
    });
  };

  const ArrowIcon = currentLanguage === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentLanguage === 'ar' ? 'النشاطات الأخيرة' : 'Recent Activities'}
        </h3>
        <div className="space-y-4">
          {allActivities.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(activity.data.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {getActivityMessage(activity)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(activity.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {allActivities.length > 5 && (
          <button className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-500">
            <span>
              {currentLanguage === 'ar' ? 'عرض كل النشاطات' : 'View all activities'}
            </span>
            <ArrowIcon className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
}