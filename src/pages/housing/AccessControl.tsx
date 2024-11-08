import React, { useState } from 'react';
import { UserPlus, Shield, Key } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { usePermissionStore } from '../../store/usePermissionStore';
import { UserRegistrationModal } from '../../components/housing/UserRegistrationModal';
import { UserApprovalsList } from '../../components/housing/UserApprovalsList';
import { AccessControlPanel } from '../../components/housing/AccessControlPanel';

export function AccessControl() {
  const { currentLanguage } = useLanguageStore();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showApprovals, setShowApprovals] = useState(false);
  const [activeTab, setActiveTab] = useState<'permissions' | 'approvals'>('permissions');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة الصلاحيات' : 'Access Control'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة المستخدمين والصلاحيات والموافقات'
              : 'Manage users, permissions, and approvals'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowApprovals(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Shield className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'الموافقات' : 'Approvals'}
          </button>
          <button
            onClick={() => setShowRegistrationModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'إضافة مستخدم' : 'Add User'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('permissions')}
            className={`${
              activeTab === 'permissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Key className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'الصلاحيات' : 'Permissions'}
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`${
              activeTab === 'approvals'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Shield className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'الموافقات' : 'Approvals'}
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'permissions' ? (
        <AccessControlPanel />
      ) : (
        <UserApprovalsList
          requests={[]}
          onApprove={() => {}}
          onReject={() => {}}
        />
      )}

      {/* Modals */}
      {showRegistrationModal && (
        <UserRegistrationModal onClose={() => setShowRegistrationModal(false)} />
      )}
    </div>
  );
}