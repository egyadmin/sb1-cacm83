import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Branch } from '../../types/branch';
import { useLanguageStore } from '../../store/useLanguageStore';

interface BranchFormProps {
  branch?: Branch;
  onSubmit: (data: Omit<Branch, 'id'>) => void;
  onClose: () => void;
}

export function BranchForm({ branch, onSubmit, onClose }: BranchFormProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    location: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    status: 'active' as const,
    type: 'branch' as const
  });

  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name,
        nameEn: branch.nameEn,
        location: branch.location,
        coordinates: branch.coordinates,
        status: branch.status,
        type: branch.type
      });
    }
  }, [branch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {branch ? (
              currentLanguage === 'ar' ? 'تعديل الفرع' : 'Edit Branch'
            ) : (
              currentLanguage === 'ar' ? 'إضافة فرع جديد' : 'Add New Branch'
            )}
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
              {currentLanguage === 'ar' ? 'اسم الفرع (عربي)' : 'Branch Name (Arabic)'}
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'اسم الفرع (إنجليزي)' : 'Branch Name (English)'}
            </label>
            <input
              type="text"
              name="nameEn"
              required
              value={formData.nameEn}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الموقع' : 'Location'}
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'خط العرض' : 'Latitude'}
              </label>
              <input
                type="number"
                step="any"
                name="coordinates.lat"
                required
                value={formData.coordinates.lat}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  coordinates: {
                    ...prev.coordinates,
                    lat: parseFloat(e.target.value)
                  }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'خط الطول' : 'Longitude'}
              </label>
              <input
                type="number"
                step="any"
                name="coordinates.lng"
                required
                value={formData.coordinates.lng}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  coordinates: {
                    ...prev.coordinates,
                    lng: parseFloat(e.target.value)
                  }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
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
              {branch ? (
                currentLanguage === 'ar' ? 'حفظ التغييرات' : 'Save Changes'
              ) : (
                currentLanguage === 'ar' ? 'إضافة الفرع' : 'Add Branch'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}