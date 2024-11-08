import React, { useState } from 'react';
import { Building2, ChevronDown, Users, MapPin } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Complex } from '../../store/useComplexStore';
import { Branch } from '../../types/branch';

interface ComplexDropdownProps {
  complexes: Complex[];
  branches: Branch[];
  selectedId: string;
  onChange: (complexId: string) => void;
}

export function ComplexDropdown({ complexes, branches, selectedId, onChange }: ComplexDropdownProps) {
  const { currentLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  // Group complexes by branch
  const complexesByBranch = branches.map(branch => ({
    ...branch,
    complexes: complexes.filter(complex => complex.branchId === branch.id)
  }));

  const selectedComplex = complexes.find(c => c.id === selectedId);
  const selectedBranch = selectedComplex 
    ? branches.find(b => b.id === selectedComplex.branchId)
    : null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <div className="flex items-center">
          <Building2 className="h-5 w-5 text-gray-400 mr-2" />
          {selectedComplex ? (
            <div>
              <div className="font-medium text-gray-900">
                {currentLanguage === 'ar' ? selectedComplex.name : selectedComplex.nameEn}
              </div>
              <div className="text-sm text-gray-500">
                {currentLanguage === 'ar' ? selectedBranch?.name : selectedBranch?.nameEn}
              </div>
            </div>
          ) : (
            <span className="text-gray-500">
              {currentLanguage === 'ar' ? 'اختر المجمع' : 'Select Complex'}
            </span>
          )}
        </div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md overflow-auto focus:outline-none">
          {complexesByBranch.map((branch) => (
            <div key={branch.id} className="border-b border-gray-200 last:border-0">
              <div className="px-4 py-2 bg-gray-50">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">
                    {currentLanguage === 'ar' ? branch.name : branch.nameEn}
                  </span>
                </div>
              </div>
              
              {branch.complexes.map((complex) => {
                const occupancyPercentage = (complex.currentOccupancy / complex.totalCapacity) * 100;
                const availableSpaces = complex.totalCapacity - complex.currentOccupancy;
                const isSelected = complex.id === selectedId;
                const isFull = availableSpaces === 0;
                
                return (
                  <button
                    key={complex.id}
                    type="button"
                    disabled={isFull}
                    onClick={() => {
                      onChange(complex.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {currentLanguage === 'ar' ? complex.name : complex.nameEn}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentLanguage === 'ar'
                          ? `${complex.buildings.length} مبنى`
                          : `${complex.buildings.length} buildings`
                        }
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`text-sm font-medium ${
                        isFull ? 'text-red-600' :
                        occupancyPercentage > 90 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {currentLanguage === 'ar'
                            ? `${availableSpaces} متاح`
                            : `${availableSpaces} available`
                          }
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round(occupancyPercentage)}% {currentLanguage === 'ar' ? 'مشغول' : 'occupied'}
                        </div>
                      </div>
                      
                      <div className="w-16">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              occupancyPercentage > 90 ? 'bg-red-600' :
                              occupancyPercentage > 70 ? 'bg-yellow-600' :
                              'bg-green-600'
                            }`}
                            style={{ width: `${occupancyPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}