import React, { useState } from 'react';
import { Building2, Users, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface Building {
  id: string;
  number: string;
  floors: number;
  totalUnits: number;
  occupiedUnits: number;
  location: string;
  facilities: {
    rooms: number;
    bathrooms: number;
    kitchens: number;
  };
  features: string[];
  maintenanceRequests: {
    total: number;
    pending: number;
  };
}

interface BuildingDetailsProps {
  building: Building;
  onRequestMaintenance: () => void;
}

export function BuildingDetails({ building, onRequestMaintenance }: BuildingDetailsProps) {
  const { currentLanguage } = useLanguageStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const occupancyRate = (building.occupiedUnits / building.totalUnits) * 100;
  const getOccupancyColor = (rate: number) => {
    if (rate > 90) return 'text-red-600';
    if (rate > 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const featureLabels = {
    elevator: { ar: 'مصعد', en: 'Elevator' },
    parking: { ar: 'موقف سيارات', en: 'Parking' },
    security: { ar: 'نظام أمني', en: 'Security System' },
    generator: { ar: 'مولد كهربائي', en: 'Generator' },
    storage: { ar: 'غرف تخزين', en: 'Storage Rooms' },
    wifi: { ar: 'إنترنت لاسلكي', en: 'WiFi' }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Building2 className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'مبنى رقم' : 'Building'} {building.number}
              </h3>
              <p className="text-sm text-gray-500">{building.location}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-500"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium text-gray-500">
              {currentLanguage === 'ar' ? 'الإشغال' : 'Occupancy'}
            </div>
            <div className={`text-lg font-semibold ${getOccupancyColor(occupancyRate)}`}>
              {building.occupiedUnits}/{building.totalUnits}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">
              {currentLanguage === 'ar' ? 'طلبات الصيانة' : 'Maintenance'}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {building.maintenanceRequests.pending}/{building.maintenanceRequests.total}
            </div>
          </div>
        </div>

        {/* Maintenance Request Button */}
        <button
          onClick={onRequestMaintenance}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Wrench className="h-4 w-4 mr-2" />
          {currentLanguage === 'ar' ? 'طلب صيانة' : 'Request Maintenance'}
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {/* Facilities */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {currentLanguage === 'ar' ? 'المرافق' : 'Facilities'}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'الغرف' : 'Rooms'}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {building.facilities.rooms}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'الحمامات' : 'Bathrooms'}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {building.facilities.bathrooms}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'المطابخ' : 'Kitchens'}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {building.facilities.kitchens}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {building.features.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {currentLanguage === 'ar' ? 'المميزات' : 'Features'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {building.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {currentLanguage === 'ar'
                        ? featureLabels[feature as keyof typeof featureLabels]?.ar
                        : featureLabels[feature as keyof typeof featureLabels]?.en
                      }
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}