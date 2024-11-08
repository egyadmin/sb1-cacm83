import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResidentStore } from '../../store/useResidentStore';

interface CheckOutModalProps {
  complexId: string;
  onClose: () => void;
}

export function CheckOutModal({
  complexId,
  onClose
}: CheckOutModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { getResidentsByComplex, checkOutResident } = useResidentStore();
  const [selectedResidentId, setSelectedResidentId] = useState('');

  // Get only active residents for this complex
  const activeResidents = getResidentsByComplex(complexId).filter(
    resident => resident.status === 'active'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedResidentId) {
      const confirmMessage = currentLanguage === 'ar'
        ? 'هل أنت متأكد من إخلاء السكن؟'
        : 'Are you sure you want to check out this resident?';
      
      if (window.confirm(confirmMessage)) {
        checkOutResident(selectedResidentId);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إخلاء سكن' : 'Check-out'}
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
              {currentLanguage === 'ar' ? 'اختر المقيم' : 'Select Resident'}
            </label>
            <select
              required
              value={selectedResidentId}
              onChange={(e) => setSelectedResidentId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">
                {currentLanguage === 'ar' ? 'اختر المقيم' : 'Select Resident'}
              </option>
              {activeResidents.map((resident) => (
                <option key={resident.id} value={resident.id}>
                  {resident.name} - {resident.employeeId} ({resident.jobTitle})
                </option>
              ))}
            </select>
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
              disabled={!selectedResidentId}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentLanguage === 'ar' ? 'تأكيد الإخلاء' : 'Confirm Check-out'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}