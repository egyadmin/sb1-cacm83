import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface AddDepartmentModalProps {
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
}

interface DepartmentFormData {
  name: string;
  nameEn: string;
  manager: string;
  budget: number;
  description: string;
  descriptionEn: string;
}

const initialFormData: DepartmentFormData = {
  name: '',
  nameEn: '',
  manager: '',
  budget: 0,
  description: '',
  descriptionEn: ''
};

export function AddDepartmentModal({ on<boltAction type="file" filePath="src/components/hr/AddDepartmentModal.tsx">Close, onSubmit }: AddDepartmentModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState<DepartmentFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إضافة قسم جديد' : 'Add New Department'}
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
              {currentLanguage === 'ar' ? 'اسم القسم (عربي)' : 'Department Name (Arabic)'}
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
              {currentLanguage === 'ar' ? 'اسم القسم (إنجليزي)' : 'Department Name (English)'}
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
              {currentLanguage === 'ar' ? 'مدير القسم' : 'Department Manager'}
            </label>
            <input
              type="text"
              required
              value={formData.manager}
              onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الميزانية السنوية' : 'Annual Budget'}
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              rows={3}
              value={formData.descriptionEn}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
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
              {currentLanguage === 'ar' ? 'إضافة القسم' : 'Add Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}