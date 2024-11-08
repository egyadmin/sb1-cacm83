import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useBranchStore } from '../../store/useBranchStore';
import type { Complex } from '../../store/useComplexStore';

interface AddComplexModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<Complex, 'id' | 'currentOccupancy'>) => void;
  complex?: Complex;
}

const initialBuildingData = {
  number: '',
  rooms: 0,
  bathrooms: 0,
  kitchens: 0,
  location: '',
};

export function AddComplexModal({ onClose, onSubmit, complex }: AddComplexModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { branches } = useBranchStore();
  const [formData, setFormData] = useState({
    name: complex?.name || '',
    nameEn: complex?.nameEn || '',
    branchId: complex?.branchId || '',
    totalCapacity: complex?.totalCapacity || 0,
    buildings: complex?.buildings || [{ ...initialBuildingData }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBuildingChange = (index: number, field: keyof typeof initialBuildingData, value: string | number) => {
    const newBuildings = [...formData.buildings];
    newBuildings[index] = {
      ...newBuildings[index],
      [field]: value,
      id: newBuildings[index].id || Math.random().toString(36).substr(2, 9)
    };
    setFormData(prev => ({
      ...prev,
      buildings: newBuildings
    }));
  };

  const addBuilding = () => {
    setFormData(prev => ({
      ...prev,
      buildings: [...prev.buildings, { ...initialBuildingData, id: Math.random().toString(36).substr(2, 9) }]
    }));
  };

  const removeBuilding = (index: number) => {
    if (formData.buildings.length > 1) {
      setFormData(prev => ({
        ...prev,
        buildings: prev.buildings.filter((_, i) => i !== index)
      }));
    }
  };

  // Filter out inactive branches
  const activeBranches = branches.filter(branch => branch.status === 'active');

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {complex 
              ? (currentLanguage === 'ar' ? 'تعديل مجمع سكني' : 'Edit Housing Complex')
              : (currentLanguage === 'ar' ? 'إضافة مجمع سكني جديد' : 'Add New Housing Complex')
            }
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'اسم المجمع (عربي)' : 'Complex Name (Arabic)'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'اسم المجمع (إنجليزي)' : 'Complex Name (English)'}
              </label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الفرع' : 'Branch'}
              </label>
              <select
                required
                value={formData.branchId}
                onChange={(e) => setFormData(prev => ({ ...prev, branchId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">
                  {currentLanguage === 'ar' ? 'اختر الفرع' : 'Select Branch'}
                </option>
                {activeBranches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {currentLanguage === 'ar' ? branch.name : branch.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'السعة الإجمالية' : 'Total Capacity'}
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.totalCapacity}
                onChange={(e) => setFormData(prev => ({ ...prev, totalCapacity: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'المباني' : 'Buildings'}
              </h4>
              <button
                type="button"
                onClick={addBuilding}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 ml-2" />
                {currentLanguage === 'ar' ? 'إضافة مبنى' : 'Add Building'}
              </button>
            </div>

            {formData.buildings.map((building, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium text-gray-900">
                    {currentLanguage === 'ar' ? `مبنى ${index + 1}` : `Building ${index + 1}`}
                  </h5>
                  {formData.buildings.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBuilding(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {currentLanguage === 'ar' ? 'رقم المبنى' : 'Building Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={building.number}
                      onChange={(e) => handleBuildingChange(index, 'number', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {currentLanguage === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={building.rooms}
                      onChange={(e) => handleBuildingChange(index, 'rooms', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {currentLanguage === 'ar' ? 'عدد الحمامات' : 'Number of Bathrooms'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={building.bathrooms}
                      onChange={(e) => handleBuildingChange(index, 'bathrooms', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {currentLanguage === 'ar' ? 'عدد المطابخ' : 'Number of Kitchens'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={building.kitchens}
                      onChange={(e) => handleBuildingChange(index, 'kitchens', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {currentLanguage === 'ar' ? 'الموقع' : 'Location'}
                    </label>
                    <input
                      type="text"
                      required
                      value={building.location}
                      onChange={(e) => handleBuildingChange(index, 'location', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
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
              {complex
                ? (currentLanguage === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                : (currentLanguage === 'ar' ? 'إضافة المجمع' : 'Add Complex')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}