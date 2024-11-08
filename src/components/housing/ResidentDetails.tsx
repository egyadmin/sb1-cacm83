import React from 'react';
import { X, User, Building2, Calendar, FileText, Clock } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResidentStore } from '../../store/useResidentStore';
import { useComplexStore } from '../../store/useComplexStore';

interface ResidentDetailsProps {
  residentId: string;
  onClose: () => void;
}

export function ResidentDetails({ residentId, onClose }: ResidentDetailsProps) {
  const { currentLanguage } = useLanguageStore();
  const { getResidentById } = useResidentStore();
  const { getComplexById } = useComplexStore();

  const resident = getResidentById(residentId);
  const complex = resident ? getComplexById(resident.complexId) : null;

  if (!resident || !complex) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <User className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'تفاصيل المقيم' : 'Resident Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <p className="mt-1 text-sm text-gray-900">{resident.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
                </label>
                <p className="mt-1 text-sm text-gray-900">{resident.employeeId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}
                </label>
                <p className="mt-1 text-sm text-gray-900">{resident.iqamaNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'المهنة' : 'Job Title'}
                </label>
                <p className="mt-1 text-sm text-gray-900">{resident.jobTitle}</p>
              </div>
            </div>
          </div>

          {/* Housing Information */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'معلومات السكن' : 'Housing Information'}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'المجمع' : 'Complex'}
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {currentLanguage === 'ar' ? complex.name : complex.nameEn}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'المبنى' : 'Building'}
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {currentLanguage === 'ar' ? 'مبنى رقم' : 'Building'} {resident.buildingNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'تاريخ التسكين' : 'Check-in Date'}
                </label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(resident.checkInDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                </label>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    resident.status === 'active' ? 'bg-green-100 text-green-800' :
                    resident.status === 'temporary' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentLanguage === 'ar'
                      ? resident.status === 'active' ? 'نشط'
                        : resident.status === 'temporary' ? 'مؤقت'
                        : 'غير نشط'
                      : resident.status.charAt(0).toUpperCase() + resident.status.slice(1)
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* History */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'السجل' : 'History'}
            </h4>
            <div className="space-y-4">
              {resident.history?.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {event.type === 'check_in' ? (
                      <Calendar className="h-5 w-5 text-green-500" />
                    ) : event.type === 'transfer' ? (
                      <Building2 className="h-5 w-5 text-blue-500" />
                    ) : event.type === 'maintenance' ? (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{event.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {currentLanguage === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}