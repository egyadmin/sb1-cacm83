import React, { useState } from 'react';
import { X, UserPlus, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResidentStore } from '../../store/useResidentStore';
import { useComplexStore } from '../../store/useComplexStore';
import { useBranchStore } from '../../store/useBranchStore';
import { useNavigate } from 'react-router-dom';

interface CheckInModalProps {
  complexId: string;
  buildingId: string;
  unitId: string;
  onClose: () => void;
}

interface ResidentFormData {
  name: string;
  employeeId: string;
  iqamaNumber: string;
  jobTitle: string;
}

export function CheckInModal({
  complexId,
  buildingId,
  unitId,
  onClose
}: CheckInModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { addResident } = useResidentStore();
  const { complexes } = useComplexStore();
  const { branches } = useBranchStore();
  const navigate = useNavigate();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ResidentFormData | null>(null);

  const [formData, setFormData] = useState<ResidentFormData>({
    name: '',
    employeeId: '',
    iqamaNumber: '',
    jobTitle: ''
  });

  // Get complex and branch details
  const complex = complexes.find(c => c.id === complexId);
  const branch = complex ? branches.find(b => b.id === complex.branchId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResident = {
      ...formData,
      complexId,
      buildingId,
      unitId,
      checkInDate: new Date().toISOString()
    };
    
    addResident(newResident);
    setSubmittedData(formData);
    setIsSubmitted(true);
  };

  const handleViewResidents = () => {
    navigate('/residents');
    onClose();
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'تم التسكين بنجاح' : 'Check-in Successful'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'اسم المقيم' : 'Resident Name'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{submittedData.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{submittedData.employeeId}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{submittedData.iqamaNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'المهنة' : 'Job Title'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{submittedData.jobTitle}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'الفرع' : 'Branch'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {currentLanguage === 'ar' ? branch?.name : branch?.nameEn}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'المجمع' : 'Complex'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {currentLanguage === 'ar' ? complex?.name : complex?.nameEn}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'تاريخ التسكين' : 'Check-in Date'}
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US')}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleViewResidents}
              className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {currentLanguage === 'ar' ? 'عرض قائمة المقيمين' : 'View Residents List'}
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {currentLanguage === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'تسكين جديد' : 'New Check-in'}
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
              {currentLanguage === 'ar' ? 'الفرع' : 'Branch'}
            </label>
            <input
              type="text"
              readOnly
              value={currentLanguage === 'ar' ? branch?.name : branch?.nameEn}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'المجمع' : 'Complex'}
            </label>
            <input
              type="text"
              readOnly
              value={currentLanguage === 'ar' ? complex?.name : complex?.nameEn}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'اسم المقيم' : 'Resident Name'}
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
              {currentLanguage === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
            </label>
            <input
              type="text"
              required
              value={formData.employeeId}
              onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}
            </label>
            <input
              type="text"
              required
              value={formData.iqamaNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, iqamaNumber: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'المهنة' : 'Job Title'}
            </label>
            <input
              type="text"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
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
              {currentLanguage === 'ar' ? 'تأكيد التسكين' : 'Confirm Check-in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}