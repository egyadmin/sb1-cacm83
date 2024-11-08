import React, { useState } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResidentStore } from '../../store/useResidentStore';
import { useComplexStore } from '../../store/useComplexStore';
import { useApprovalWorkflow } from '../../hooks/useApprovalWorkflow';

interface TransferResidentModalProps {
  onClose: () => void;
}

export function TransferResidentModal({ onClose }: TransferResidentModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { residents } = useResidentStore();
  const { complexes } = useComplexStore();
  const { requestApproval } = useApprovalWorkflow();
  
  const [formData, setFormData] = useState({
    residentId: '',
    toComplexId: '',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await requestApproval('resident_transfer', {
      ...formData,
      type: 'resident_transfer'
    });
    
    onClose();
  };

  const activeResidents = residents.filter(r => r.status === 'active');
  const availableComplexes = complexes.filter(c => c.id !== formData.residentId);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ArrowRightLeft className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'نقل مقيم' : 'Transfer Resident'}
            </h3>
          </div>
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
              {currentLanguage === 'ar' ? 'المقيم' : 'Resident'}
            </label>
            <select
              required
              value={formData.residentId}
              onChange={(e) => setFormData(prev => ({ ...prev, residentId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">
                {currentLanguage === 'ar' ? 'اختر المقيم' : 'Select Resident'}
              </option>
              {activeResidents.map((resident) => (
                <option key={resident.id} value={resident.id}>
                  {resident.name} - {resident.employeeId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'المجمع الجديد' : 'New Complex'}
            </label>
            <select
              required
              value={formData.toComplexId}
              onChange={(e) => setFormData(prev => ({ ...prev, toComplexId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">
                {currentLanguage === 'ar' ? 'اختر المجمع' : 'Select Complex'}
              </option>
              {availableComplexes.map((complex) => (
                <option key={complex.id} value={complex.id}>
                  {currentLanguage === 'ar' ? complex.name : complex.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'سبب النقل' : 'Transfer Reason'}
            </label>
            <textarea
              required
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
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
              {currentLanguage === 'ar' ? 'تقديم طلب النقل' : 'Submit Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}