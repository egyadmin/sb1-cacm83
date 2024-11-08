import React from 'react';
import { Building2, Users, Edit2, Trash2 } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Building } from '../../store/useComplexStore';

interface BuildingsListProps {
  buildings: Building[];
  onEdit?: (buildingId: string) => void;
  onDelete?: (buildingId: string) => void;
}

export function BuildingsList({ buildings, onEdit, onDelete }: BuildingsListProps) {
  const { currentLanguage } = useLanguageStore();

  const getOccupancyColor = (occupancyRate: number) => {
    if (occupancyRate > 90) return 'text-red-600';
    if (occupancyRate > 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">
        {currentLanguage === 'ar' ? 'المباني' : 'Buildings'}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buildings.map((building) => {
          const occupancyRate = (building.rooms > 0) 
            ? Math.round((building.occupied / building.rooms) * 100) 
            : 0;

          return (
            <div
              key={building.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">
                      {currentLanguage === 'ar' ? 'مبنى رقم' : 'Building'} {building.number}
                    </h5>
                    <p className="text-sm text-gray-500">{building.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(building.id)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(building.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'الغرف' : 'Rooms'}
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className="text-lg font-semibold text-gray-900">{building.rooms}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({building.bathrooms} {currentLanguage === 'ar' ? 'حمام' : 'bath'}, 
                      {building.kitchens} {currentLanguage === 'ar' ? 'مطبخ' : 'kitchen'})
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'الإشغال' : 'Occupancy'}
                  </div>
                  <div className="mt-1 flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span className={`text-lg font-semibold ${getOccupancyColor(occupancyRate)}`}>
                      {occupancyRate}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}