import React, { useState } from 'react';
import { X, Wrench, AlertTriangle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface MaintenanceRequestModalProps {
  complexId: string;
  buildingId: string;
  onClose: () => void;
}

const maintenanceTypes = [
  { value: 'electrical', labelAr: 'كهرباء', labelEn: 'Electrical', icon: '⚡' },
  { value: 'plumbing', labelAr: 'سباكة', labelEn: 'Plumbing', icon: '🚰' },
  { value: 'ac', labelAr: 'تكييف', labelEn: 'AC', icon: '❄️' },
  { value: 'other', labelAr: 'أخرى', labelEn: 'Other', icon: '🔧' }
];

const priorityLevels = [
  { value: 'low', labelAr: 'منخفضة', labelEn: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', labelAr: 'متوسطة', labelEn: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', labelAr: 'عالية', labelEn: 'High', color: 'bg-red-100 text-red-800' },
  { value: 'urgent', labelAr: 'طارئة', labelEn: 'Urgent', color: 'bg-red-600 text-white' }
];

export function MaintenanceRequestModal({
  complexId,
  buildingId,
  onClose
}: MaintenanceRequestModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState({
    type: 'electrical',
    priority: 'medium',
    description: '',
    location: '',
    reportedBy: '',
    contactNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle maintenance request submission
    console.log('Maintenance request submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Wrench className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'طلب صيانة جديد' : 'New Maintenance Request'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Maintenance Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'نوع الصيانة' : 'Maintenance Type'}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {maintenanceTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium transition-colors
                    ${formData.type === type.value
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {currentLanguage === 'ar' ? type.labelAr : type.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'مستوى الأولوية' : 'Priority Level'}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {priorityLevels.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${formData.priority === priority.value
                      ? priority.color
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {currentLanguage === 'ar' ? priority.labelAr : priority.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Location Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'موقع العطل' : 'Issue Location'}
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder={currentLanguage === 'ar' ? 'مثال: الدور الثاني - شقة 203' : 'e.g., Second Floor - Apt 203'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'وصف المشكلة' : 'Issue Description'}
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder={currentLanguage === 'ar' 
                ? 'يرجى وصف المشكلة بالتفصيل...'
                : 'Please describe the issue in detail...'
              }
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'مقدم الطلب' : 'Reported By'}
              </label>
              <input
                type="text"
                required
                value={formData.reportedBy}
                onChange={(e) => setFormData(prev => ({ ...prev, reportedBy: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'رقم التواصل' : 'Contact Number'}
              </label>
              <input
                type="tel"
                required
                value={formData.contactNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Warning Message for Urgent Requests */}
          {formData.priority === 'urgent' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div className="mr-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {currentLanguage === 'ar'
                      ? 'تنبيه: طلب صيانة طارئ'
                      : 'Warning: Urgent Maintenance Request'
                    }
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {currentLanguage === 'ar'
                      ? 'سيتم التعامل مع هذا الطلب على الفور. يرجى التأكد من صحة رقم التواصل.'
                      : 'This request will be handled immediately. Please ensure the contact number is correct.'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {currentLanguage === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {currentLanguage === 'ar' ? 'تقديم الطلب' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}