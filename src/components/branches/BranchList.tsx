import React from 'react';
import { MapPin, Edit2, Trash2 } from 'lucide-react';
import { useBranchStore } from '../../store/useBranchStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Branch } from '../../types/branch';

interface BranchListProps {
  onEdit: (branch: Branch) => void;
  onDelete: (branchId: string) => void;
}

export function BranchList({ onEdit, onDelete }: BranchListProps) {
  const { branches } = useBranchStore();
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {currentLanguage === 'ar' ? branch.name : branch.nameEn}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentLanguage === 'ar' ? branch.nameEn : branch.name}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  branch.type === 'main'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {branch.type === 'main'
                  ? currentLanguage === 'ar'
                    ? 'رئيسي'
                    : 'Main'
                  : currentLanguage === 'ar'
                  ? 'فرع'
                  : 'Branch'}
              </span>
            </div>

            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{branch.location}</span>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onEdit(branch)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              {branch.type !== 'main' && (
                <button
                  onClick={() => onDelete(branch.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}