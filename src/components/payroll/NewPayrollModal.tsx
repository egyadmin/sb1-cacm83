import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface NewPayrollModalProps {
  onClose: () => void;
}

interface PayrollFormData {
  month: string;
  department: string;
  includeAllowances: boolean;
  includeDeductions: boolean;
  notes: string;
}

const initialFormData: PayrollFormData = {
  month: '',
  department: '',
  includeAllowances: true,
  includeDeductions: true,
  notes: ''
};

export function NewPayrollModal({ onClose }: NewPayrollModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState<PayrollFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'مسير رواتب جديد' : 'New Payroll'}
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
              {currentLanguage === 'ar' ? 'الشهر' : 'Month'}
            </label>
            <input
              type="month"
              required
              value={formData.month}
              onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'القسم' : 'Department'}
            </label>
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">
                {currentLanguage === 'ar' ? 'اختر القسم' : 'Select Department'}
              </option>
              <option value="all">
                {currentLanguage === 'ar' ? 'جميع الأقسام' : 'All Departments'}
              </option>
              <option value="it">
                {currentLanguage === 'ar' ? 'تقنية المعلومات' : 'IT'}
              </option>
              <option value="hr">
                {currentLanguage === 'ar' ? 'الموارد البشرية' : 'HR'}
              </option>
              <option value="finance">
                {currentLanguage === 'ar' ? 'المالية' : 'Finance'}
              </option>
              <option value="operations">
                {currentLanguage === 'ar' ? 'العمليات' : 'Operations'}
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeAllowances"
                checked={formData.includeAllowances}
                onChange={(e) => setFormData(prev => ({ ...prev, includeAllowances: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeAllowances" className="ml-2 block text-sm text-gray-900">
                {currentLanguage === 'ar' ? 'تضمين البدلات' : 'Include Allowances'}
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeDeductions"
                checked={formData.includeDeductions}
                onChange={(e) => setFormData(prev => ({ ...prev, includeDeductions: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeDeductions" className="ml-2 block text-sm text-gray-900">
                {currentLanguage === 'ar' ? 'تضمين الخصومات' : 'Include Deductions'}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'ملاحظات' : 'Notes'}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
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
              {currentLanguage === 'ar' ? 'إنشاء' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}