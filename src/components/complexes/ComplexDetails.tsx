import React, { useState } from 'react';
import { Building2, Users, Wrench, Plus } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { BuildingsList } from './BuildingsList';
import { MaintenanceRequestModal } from './MaintenanceRequestModal';
import { ComplexChart } from './ComplexChart';

interface ComplexDetailsProps {
  complex: {
    id: string;
    name: string;
    nameEn: string;
    totalCapacity: number;
    currentOccupancy: number;
    buildings: Array<{
      id: string;
      number: string;
      rooms: number;
      bathrooms: number;
      kitchens: number;
      location: string;
    }>;
  };
  onEdit?: () => void;
}

export function ComplexDetails({ complex, onEdit }: ComplexDetailsProps) {
  const { currentLanguage } = useLanguageStore();
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);

  const occupancyRate = (complex.currentOccupancy / complex.totalCapacity) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Complex Header */}
        <div className="flex items-center justify-between mb-6">
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
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800"
            >
              {currentLanguage === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          )}
        </div>

        {/* Complex Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-sm font-medium text-gray-500">
              {currentLanguage === 'ar' ? 'المباني' : 'Buildings'}
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {complex.buildings.length}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">
              {currentLanguage === 'ar' ? 'السعة' : 'Capacity'}
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {complex.totalCapacity}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">
              {currentLanguage === 'ar' ? 'الإشغال' : 'Occupancy'}
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {complex.currentOccupancy}
            </div>
          </div>
        </div>

        {/* Maintenance Request Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowMaintenanceModal(true)}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Wrench className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'طلب صيانة' : 'Request Maintenance'}
          </button>
        </div>

        {/* Occupancy Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'نسبة الإشغال' : 'Occupancy Rate'}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(occupancyRate)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                occupancyRate > 90 ? 'bg-red-600' :
                occupancyRate > 70 ? 'bg-yellow-600' :
                'bg-green-600'
              }`}
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Buildings List */}
        <BuildingsList
          buildings={complex.buildings}
          onRequestMaintenance={(buildingId) => {
            setSelectedBuildingId(buildingId);
            setShowMaintenanceModal(true);
          }}
        />
      </div>

      {/* Maintenance Request Modal */}
      {showMaintenanceModal && (
        <MaintenanceRequestModal
          complexId={complex.id}
          buildingId={selectedBuildingId || complex.buildings[0]?.id}
          onClose={() => {
            setShowMaintenanceModal(false);
            setSelectedBuildingId(null);
          }}
        />
      )}
    </div>
  );
}