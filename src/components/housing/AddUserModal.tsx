import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface AddUserModalProps {
  onClose: () => void;
}

export function AddUserModal({ onClose }: AddUserModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    scope: 'complex',
    scopeId: '',
    permissions: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User'}
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
              {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'نطاق الصلاحيات' : 'Access Scope'}
            </label>
            <select
              value={formData.scope}
              onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="complex">
                {currentLanguage === 'ar' ? 'مجمع محدد' : 'Specific Complex'}
              </option>
              <option value="branch">
                {currentLanguage === 'ar' ? 'فرع محدد' : 'Specific Branch'}
              </option>
              <option value="all">
                {currentLanguage === 'ar' ? 'جميع المجمعات' : 'All Complexes'}
              </option>
            </select>
          </div>

          {/* Add permission checkboxes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الصلاحيات' : 'Permissions'}
            </label>
            {/* Add permission checkboxes */}
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
              {currentLanguage === 'ar' ? 'إضافة المستخدم' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}