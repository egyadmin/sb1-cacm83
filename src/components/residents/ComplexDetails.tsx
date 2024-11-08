import React from 'react';
import { Building2, Users } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Complex } from '../../store/useComplexStore';

interface ComplexDetailsProps {
  complex: Complex;
}

export function ComplexDetails({ complex }: ComplexDetailsProps) {
  const { currentLanguage } = useLanguageStore();
  const occupancyPercentage = (complex.currentOccupancy / complex.totalCapacity) * 100;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? complex.name : complex.nameEn}
          </h4>
          <p className="text-sm text-gray-500">
            {currentLanguage === 'ar' ? complex.nameEn : complex.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">
            {complex.currentOccupancy}/{complex.totalCapacity}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">
            {currentLanguage === 'ar' ? 'نسبة الإشغال' : 'Occupancy'}
          </span>
          <span className={`font-medium ${
            occupancyPercentage > 90 ? 'text-red-600' :
            occupancyPercentage > 70 ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {Math.round(occupancyPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              occupancyPercentage > 90 ? 'bg-red-600' :
              occupancyPercentage > 70 ? 'bg-yellow-600' :
              'bg-green-600'
            }`}
            style={{ width: `${occupancyPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">
            {currentLanguage === 'ar' ? 'عدد المباني' : 'Buildings'}
          </div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {complex.buildings.length}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">
            {currentLanguage === 'ar' ? 'الغرف المتاحة' : 'Available Rooms'}
          </div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {complex.totalCapacity - complex.currentOccupancy}
          </div>
        </div>
      </div>
    </div>
  );
}