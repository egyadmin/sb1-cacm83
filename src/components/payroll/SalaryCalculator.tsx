import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface SalaryCalculatorProps {
  onClose: () => void;
}

export function SalaryCalculator({ onClose }: SalaryCalculatorProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState({
    basicSalary: '',
    housingAllowance: '',
    transportAllowance: '',
    otherAllowances: '',
    gosiDeduction: '',
    absenceDeductions: '',
    otherDeductions: ''
  });

  const calculateTotal = () => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const housing = parseFloat(formData.housingAllowance) || 0;
    const transport = parseFloat(formData.transportAllowance) || 0;
    const otherAll = parseFloat(formData.otherAllowances) || 0;
    const gosi = parseFloat(formData.gosiDeduction) || 0;
    const absence = parseFloat(formData.absenceDeductions) || 0;
    const otherDed = parseFloat(formData.otherDeductions) || 0;

    const totalAllowances = housing + transport + otherAll;
    const totalDeductions = gosi + absence + otherDed;
    const netSalary = basic + totalAllowances - totalDeductions;

    return {
      totalAllowances,
      totalDeductions,
      netSalary
    };
  };

  const totals = calculateTotal();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calculator className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'حاسبة الرواتب' : 'Salary Calculator'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}
            </label>
            <input
              type="number"
              value={formData.basicSalary}
              onChange={(e) => setFormData(prev => ({ ...prev, basicSalary: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Allowances */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'البدلات' : 'Allowances'}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'بدل السكن' : 'Housing'}
                </label>
                <input
                  type="number"
                  value={formData.housingAllowance}
                  onChange={(e) => setFormData(prev => ({ ...prev, housingAllowance: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'بدل النقل' : 'Transport'}
                </label>
                <input
                  type="number"
                  value={formData.transportAllowance}
                  onChange={(e) => setFormData(prev => ({ ...prev, transportAllowance: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'بدلات أخرى' : 'Other'}
                </label>
                <input
                  type="number"
                  value={formData.otherAllowances}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherAllowances: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'الخصومات' : 'Deductions'}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'التأمينات' : 'GOSI'}
                </label>
                <input
                  type="number"
                  value={formData.gosiDeduction}
                  onChange={(e) => setFormData(prev => ({ ...prev, gosiDeduction: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'خصم الغياب' : 'Absences'}
                </label>
                <input
                  type="number"
                  value={formData.absenceDeductions}
                  onChange={(e) => setFormData(prev => ({ ...prev, absenceDeductions: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'خصومات أخرى' : 'Other'}
                </label>
                <input
                  type="number"
                  value={formData.otherDeductions}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherDeductions: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'إجمالي البدلات' : 'Total Allowances'}
              </span>
              <span className="text-sm font-medium text-green-600">
                {totals.totalAllowances.toFixed(2)} {currentLanguage === 'ar' ? 'ر.س' : 'SAR'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'إجمالي الخصومات' : 'Total Deductions'}
              </span>
              <span className="text-sm font-medium text-red-600">
                {totals.totalDeductions.toFixed(2)} {currentLanguage === 'ar' ? 'ر.س' : 'SAR'}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">
                  {currentLanguage === 'ar' ? 'صافي الراتب' : 'Net Salary'}
                </span>
                <span className="text-lg font-semibold text-blue-600">
                  {totals.netSalary.toFixed(2)} {currentLanguage === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}