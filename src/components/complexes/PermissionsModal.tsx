import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import type { Permission, PermissionScope } from '../../types/permissions';

interface PermissionsModalProps {
  onClose: () => void;
  onSubmit: (permissions: Permission[]) => void;
  currentPermissions?: Permission[];
}

export function PermissionsModal({ onClose, onSubmit, currentPermissions = [] }: PermissionsModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(currentPermissions);

  const availablePermissions = [
    {
      code: 'view_complexes',
      name: 'View Complexes',
      nameAr: 'عرض المجمعات',
    },
    {
      code: 'manage_complexes',
      name: 'Manage Complexes',
      nameAr: 'إدارة المجمعات',
    },
    {
      code: 'manage_residents',
      name: 'Manage Residents',
      nameAr: 'إدارة المقيمين',
    },
    {
      code: 'approve_changes',
      name: 'Approve Changes',
      nameAr: 'الموافقة على التغييرات',
    },
    // ... add other permissions
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedPermissions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'إدارة الصلاحيات' : 'Manage Permissions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Permission List */}
          <div className="space-y-4">
            {availablePermissions.map((permission) => (
              <div key={permission.code} className="flex items-center">
                <input
                  type="checkbox"
                  id={permission.code}
                  checked={selectedPermissions.some(p => p.code === permission.code)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPermissions([...selectedPermissions, {
                        ...permission,
                        id: Math.random().toString(36).substr(2, 9),
                        scope: { type: 'all' }
                      }]);
                    } else {
                      setSelectedPermissions(selectedPermissions.filter(p => p.code !== permission.code));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={permission.code} className="ml-3 block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? permission.nameAr : permission.name}
                </label>
              </div>
            ))}
          </div>

          {/* Scope Selection */}
          {selectedPermissions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLanguage === 'ar' ? 'نطاق الصلاحيات' : 'Permission Scope'}
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                onChange={(e) => {
                  const scope: PermissionScope = { type: e.target.value as 'all' | 'complex' | 'region' };
                  setSelectedPermissions(prev => prev.map(p => ({ ...p, scope })));
                }}
              >
                <option value="all">
                  {currentLanguage === 'ar' ? 'جميع المجمعات' : 'All Complexes'}
                </option>
                <option value="region">
                  {currentLanguage === 'ar' ? 'منطقة محددة' : 'Specific Region'}
                </option>
                <option value="complex">
                  {currentLanguage === 'ar' ? 'مجمع محدد' : 'Specific Complex'}
                </option>
              </select>
            </div>
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
              {currentLanguage === 'ar' ? 'حفظ الصلاحيات' : 'Save Permissions'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}