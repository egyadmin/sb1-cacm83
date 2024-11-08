import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface ComplexActionsProps {
  onMaintenance: () => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function ComplexActions({ onMaintenance, onCheckIn, onCheckOut }: ComplexActionsProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={onMaintenance}
        className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
      >
        {currentLanguage === 'ar' ? 'طلب صيانة' : 'Maintenance'}
      </button>
      <button
        onClick={onCheckIn}
        className="flex-1 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100"
      >
        {currentLanguage === 'ar' ? 'تسكين' : 'Check-in'}
      </button>
      <button
        onClick={onCheckOut}
        className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
      >
        {currentLanguage === 'ar' ? 'إخلاء' : 'Check-out'}
      </button>
    </div>
  );
}