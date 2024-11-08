import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useMaintenanceStore } from '../../store/useMaintenanceStore';

interface HousingActionModalProps {
  complexId: string;
  buildingId: string;
  unitId: string;
  actionType: 'check_in' | 'check_out';
  onClose: () => void;
}

export function HousingActionModal({
  complexId,
  buildingId,
  unitId,
  actionType,
  onClose
}: HousingActionModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { addHousingAction } = useMaintenanceStore();
  const [formData, setFormData] = useState({
    residentId: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHousingAction({
      complexId,
      buildingId,
      unitId,
      type: actionType,
      ...formData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {actionType === 'check_in' 
              ? (currentLanguage === 'ar' ? 'تسكين جديد' : 'New Check-in')
              : (currentLanguage === 'ar' ? 'إخلاء سكن' : 'Check-out')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'رقم الموظف' : 'Employee ID'}
            </label>
            <input
              type="text"
              required
              value={formData.residentId}
              onChange={(e) => setFormData(prev => ({ ...prev, residentId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'التاريخ' : 'Date'}
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'ملاحظات' : 'Notes'}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

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
              {currentLanguage === 'ar' ? 'تأكيد' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}