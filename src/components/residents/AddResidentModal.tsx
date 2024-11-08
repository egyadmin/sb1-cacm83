import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResidentStore } from '../../store/useResidentStore';
import { useComplexStore } from '../../store/useComplexStore';
import { useBranchStore } from '../../store/useBranchStore';
import { ComplexDropdown } from './ComplexDropdown';
import { ComplexDetails } from './ComplexDetails';

interface AddResidentModalProps {
  onClose: () => void;
}

interface ResidentFormData {
  name: string;
  employeeId: string;
  iqamaNumber: string;
  jobTitle: string;
  complexId: string;
  buildingId: string;
}

const initialFormData: ResidentFormData = {
  name: '',
  employeeId: '',
  iqamaNumber: '',
  jobTitle: '',
  complexId: '',
  buildingId: ''
};

export function AddResidentModal({ onClose }: AddResidentModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { addResident } = useResidentStore();
  const { complexes } = useComplexStore();
  const { branches } = useBranchStore();
  const [formData, setFormData] = useState<ResidentFormData>(initialFormData);

  // Get only active branches
  const activeBranches = branches.filter(branch => branch.status === 'active');

  const selectedComplex = complexes.find(c => c.id === formData.complexId);
  const availableBuildings = selectedComplex?.buildings || [];

  const handleComplexChange = (complexId: string) => {
    setFormData(prev => ({
      ...prev,
      complexId,
      buildingId: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResident = {
      ...formData,
      unitId: 'default',
      checkInDate: new Date().toISOString(),
    };
    
    addResident(newResident);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إضافة مقيم جديد' : 'Add New Resident'}
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
              {currentLanguage === 'ar' ? 'الاسم' : 'Name'}
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'المجمع' : 'Complex'}
            </label>
            <ComplexDropdown
              complexes={complexes}
              branches={activeBranches}
              selectedId={formData.complexId}
              onChange={handleComplexChange}
            />
          </div>

          {selectedComplex && (
            <>
              <ComplexDetails complex={selectedComplex} />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'المبنى' : 'Building'}
                </label>
                <select
                  required
                  value={formData.buildingId}
                  onChange={(e) => setFormData(prev => ({ ...prev, buildingId: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">
                    {currentLanguage === 'ar' ? 'اختر المبنى' : 'Select Building'}
                  </option>
                  {availableBuildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {currentLanguage === 'ar' ? 'مبنى رقم' : 'Building'} {building.number}
                      {' - '}
                      {building.location}
                      {' - '}
                      {currentLanguage === 'ar'
                        ? `(${building.rooms} غرفة)`
                        : `(${building.rooms} rooms)`
                      }
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

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
              {currentLanguage === 'ar' ? 'إضافة المقيم' : 'Add Resident'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}