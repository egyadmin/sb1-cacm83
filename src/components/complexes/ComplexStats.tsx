import React from 'react';
import { Building2, Users } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface ComplexStatsProps {
  totalRooms: number;
  currentOccupancy: number;
  totalCapacity: number;
}

export function ComplexStats({ totalRooms, currentOccupancy, totalCapacity }: ComplexStatsProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="flex items-center">
        <Building2 className="h-5 w-5 text-gray-400 mr-2" />
        <div>
          <div className="text-sm font-medium text-gray-500">
            {currentLanguage === 'ar' ? 'الغرف' : 'Rooms'}
          </div>
          <div className="text-lg font-semibold text-gray-900">{totalRooms}</div>
        </div>
      </div>

      <div className="flex items-center">
        <Users className="h-5 w-5 text-gray-400 mr-2" />
        <div>
          <div className="text-sm font-medium text-gray-500">
            {currentLanguage === 'ar' ? 'الإشغال' : 'Occupancy'}
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {currentOccupancy}/{totalCapacity}
          </div>
        </div>
      </div>
    </div>
  );
}