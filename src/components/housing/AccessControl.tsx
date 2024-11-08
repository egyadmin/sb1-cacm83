import React, { useState } from 'react';
import { UserPlus, Shield, Key } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { usePermissionStore } from '../../store/usePermissionStore';

export function AccessControl() {
  const { currentLanguage } = useLanguageStore();
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة الصلاحيات' : 'Access Control'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {currentLanguage === 'ar' 
              ? 'إدارة المستخدمين وصلاحياتهم'
              : 'Manage users and their permissions'
            }
          </p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'إضافة مستخدم' : 'Add User'}
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {/* Add user list items here */}
        </ul>
      </div>

      {/* Add modals for user management */}
    </div>
  );
}