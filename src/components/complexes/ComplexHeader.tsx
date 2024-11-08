import React from 'react';
import { Edit2 } from 'lucide-react';
import { Complex } from '../../store/useComplexStore';
import { useLanguageStore } from '../../store/useLanguageStore';

interface ComplexHeaderProps {
  complex: Complex;
  onEdit?: (complex: Complex) => void;
}

export function ComplexHeader({ complex, onEdit }: ComplexHeaderProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          {currentLanguage === 'ar' ? complex.name : complex.nameEn}
        </h3>
        <p className="text-sm text-gray-500">
          {currentLanguage === 'ar' ? complex.nameEn : complex.name}
        </p>
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit(complex)}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}