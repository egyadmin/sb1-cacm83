import React, { useState } from 'react';
import { X, Building2, Plus } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface AddBuildingModalProps {
  complexId: string;
  onClose: () => void;
  onSubmit: (data: BuildingFormData) => void;
}

interface BuildingFormData {
  number: string;
  floors: number;
  totalUnits: number;
  location: string;
  facilities: {
    rooms: number;
    bathrooms: number;
    kitchens: number;
  };
  features: string[];
}

const initialFormData: BuildingFormData = {
  number: '',
  floors: 1,
  totalUnits: 1,
  location: '',
  facilities: {
    rooms: 1,
    bathrooms: 1,
    kitchens: 1
  },
  features: []
};

const buildingFeatures = [
  { id: 'elevator', labelAr: 'مصعد', labelEn: 'Elevator' },
  { id: 'parking', labelAr: 'موقف سيارات', labelEn: 'Parking' },
  { id: 'security', labelAr: 'نظام أمني', labelEn: 'Security System' },
  { id: 'generator', labelAr: 'مولد كهربائي', labelEn: 'Generator' },
  { id: 'storage', labelAr: 'غرف تخزين', labelEn: 'Storage Rooms' },
  { id: 'wifi', labelAr: 'إنترنت لاسلكي', labelEn: 'WiFi' }
];

export function AddBuildingModal({ complexId, onClose, onSubmit }: AddBuildingModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState<BuildingFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'إضافة مبنى جديد' : 'Add New Building'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Building Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'رقم المبنى' : 'Building Number'}
              </label>
              <input
                type="text"
                required
                value={formData.number}
                onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الموقع' : 'Location'}
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Number of Floors */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'عدد الطوابق' : 'Number of Floors'}
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.floors}
                onChange={(e) => setFormData(prev => ({ ...prev, floors: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Total Units */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'عدد الوحدات' : 'Total Units'}
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.totalUnits}
                onChange={(e) => setFormData(prev => ({ ...prev, totalUnits: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {currentLanguage === 'ar' ? 'المرافق' : 'Facilities'}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'الغرف' : 'Rooms'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.facilities.rooms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    facilities: { ...prev.facilities, rooms: parseInt(e.target.value) }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'الحمامات' : 'Bathrooms'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.facilities.bathrooms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    facilities: { ...prev.facilities, bathrooms: parseInt(e.target.value) }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'المطابخ' : 'Kitchens'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.facilities.kitchens}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    facilities: { ...prev.facilities, kitchens: parseInt(e.target.value) }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {currentLanguage === 'ar' ? 'المميزات' : 'Features'}
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {buildingFeatures.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleFeature(feature.id)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium transition-colors
                    ${formData.features.includes(feature.id)
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {currentLanguage === 'ar' ? feature.labelAr : feature.labelEn}
                </button>
              ))}
            </div>
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
              {currentLanguage === 'ar' ? 'إضافة المبنى' : 'Add Building'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}