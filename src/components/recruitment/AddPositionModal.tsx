import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface AddPositionModalProps {
  onClose: () => void;
  onSubmit: (data: JobPositionFormData) => void;
}

export interface JobPositionFormData {
  position: string;
  positionEn: string;
  department: string;
  departmentEn: string;
  description: string;
  descriptionEn: string;
  requirements: string[];
  requirementsEn: string[];
  salary: {
    min: number;
    max: number;
  };
}

const departments = [
  { ar: 'الهندسة', en: 'Engineering' },
  { ar: 'العمليات', en: 'Operations' },
  { ar: 'المالية', en: 'Finance' },
  { ar: 'الموارد البشرية', en: 'Human Resources' },
  { ar: 'إدارة المشاريع', en: 'Project Management' },
  { ar: 'المشتريات', en: 'Procurement' },
  { ar: 'الجودة', en: 'Quality Control' },
  { ar: 'الصيانة', en: 'Maintenance' }
];

const initialFormData: JobPositionFormData = {
  position: '',
  positionEn: '',
  department: '',
  departmentEn: '',
  description: '',
  descriptionEn: '',
  requirements: [''],
  requirementsEn: [''],
  salary: {
    min: 0,
    max: 0
  }
};

export function AddPositionModal({ onClose, onSubmit }: AddPositionModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState<JobPositionFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    setFormData(prev => ({
      ...prev,
      department: departments[selectedIndex - 1]?.ar || '',
      departmentEn: departments[selectedIndex - 1]?.en || ''
    }));
  };

  const addRequirement = (lang: 'ar' | 'en') => {
    setFormData(prev => ({
      ...prev,
      requirements: lang === 'ar' ? [...prev.requirements, ''] : prev.requirements,
      requirementsEn: lang === 'en' ? [...prev.requirementsEn, ''] : prev.requirementsEn
    }));
  };

  const updateRequirement = (index: number, value: string, lang: 'ar' | 'en') => {
    setFormData(prev => ({
      ...prev,
      requirements: lang === 'ar' 
        ? prev.requirements.map((req, i) => i === index ? value : req)
        : prev.requirements,
      requirementsEn: lang === 'en'
        ? prev.requirementsEn.map((req, i) => i === index ? value : req)
        : prev.requirementsEn
    }));
  };

  const removeRequirement = (index: number, lang: 'ar' | 'en') => {
    setFormData(prev => ({
      ...prev,
      requirements: lang === 'ar'
        ? prev.requirements.filter((_, i) => i !== index)
        : prev.requirements,
      requirementsEn: lang === 'en'
        ? prev.requirementsEn.filter((_, i) => i !== index)
        : prev.requirementsEn
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إضافة وظيفة جديدة' : 'Add New Position'}
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
                {currentLanguage === 'ar' ? 'المسمى الوظيفي (عربي)' : 'Position Title (Arabic)'}
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'المسمى الوظيفي (إنجليزي)' : 'Position Title (English)'}
              </label>
              <input
                type="text"
                required
                value={formData.positionEn}
                onChange={(e) => setFormData(prev => ({ ...prev, positionEn: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'القسم' : 'Department'}
              </label>
              <select
                required
                onChange={handleDepartmentChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">
                  {currentLanguage === 'ar' ? 'اختر القسم' : 'Select Department'}
                </option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept.en}>
                    {currentLanguage === 'ar' ? dept.ar : dept.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الوصف الوظيفي (عربي)' : 'Job Description (Arabic)'}
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الوصف الوظيفي (إنجليزي)' : 'Job Description (English)'}
              </label>
              <textarea
                required
                rows={3}
                value={formData.descriptionEn}
                onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'المتطلبات (عربي)' : 'Requirements (Arabic)'}
                </label>
                <button
                  type="button"
                  onClick={() => addRequirement('ar')}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {currentLanguage === 'ar' ? 'إضافة متطلب' : 'Add Requirement'}
                </button>
              </div>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value, 'ar')}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index, 'ar')}
                      className="text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="sm:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'المتطلبات (إنجليزي)' : 'Requirements (English)'}
                </label>
                <button
                  type="button"
                  onClick={() => addRequirement('en')}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {currentLanguage === 'ar' ? 'إضافة متطلب' : 'Add Requirement'}
                </button>
              </div>
              {formData.requirementsEn.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value, 'en')}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {formData.requirementsEn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index, 'en')}
                      className="text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الراتب الأدنى' : 'Minimum Salary'}
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.salary.min}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  salary: { ...prev.salary, min: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الراتب الأعلى' : 'Maximum Salary'}
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.salary.max}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  salary: { ...prev.salary, max: parseInt(e.target.value) }
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
              {currentLanguage === 'ar' ? 'إضافة الوظيفة' : 'Add Position'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}