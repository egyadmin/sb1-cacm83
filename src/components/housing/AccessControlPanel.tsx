import React, { useState } from 'react';
import { Shield, UserPlus, Users, Settings, Plus, X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { usePermissionStore } from '../../store/usePermissionStore';
import { usePermissions } from '../../hooks/usePermissions';
import type { Role, Permission, PermissionAction, PermissionResource } from '../../types/permissions';

export function AccessControlPanel() {
  const { currentLanguage } = useLanguageStore();
  const { roles, addRole, updateRole, deleteRole, grantPermission, revokePermission } = usePermissionStore();
  const { canManageRoles } = usePermissions();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);

  const permissionMatrix: Array<{
    resource: PermissionResource;
    actions: PermissionAction[];
    labelAr: string;
    labelEn: string;
  }> = [
    {
      resource: 'users',
      actions: ['view', 'create', 'update', 'delete'],
      labelAr: 'المستخدمين',
      labelEn: 'Users'
    },
    {
      resource: 'complexes',
      actions: ['view', 'create', 'update', 'delete', 'approve'],
      labelAr: 'المجمعات',
      labelEn: 'Complexes'
    },
    {
      resource: 'residents',
      actions: ['view', 'create', 'update', 'delete'],
      labelAr: 'المقيمين',
      labelEn: 'Residents'
    },
    {
      resource: 'maintenance',
      actions: ['view', 'create', 'update', 'approve'],
      labelAr: 'الصيانة',
      labelEn: 'Maintenance'
    },
    {
      resource: 'billing',
      actions: ['view', 'create', 'update', 'approve'],
      labelAr: 'الفواتير',
      labelEn: 'Billing'
    },
    {
      resource: 'reports',
      actions: ['view'],
      labelAr: 'التقارير',
      labelEn: 'Reports'
    },
    {
      resource: 'approvals',
      actions: ['view', 'create', 'approve'],
      labelAr: 'الموافقات',
      labelEn: 'Approvals'
    }
  ];

  const handlePermissionToggle = (
    roleId: string,
    action: PermissionAction,
    resource: PermissionResource
  ) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    const existingPermission = role.permissions.find(
      p => p.action === action && p.resource === resource
    );

    if (existingPermission) {
      revokePermission(roleId, existingPermission.id);
    } else {
      grantPermission(roleId, action, resource, { type: 'all' }, 'system');
    }
  };

  const hasPermission = (role: Role, action: PermissionAction, resource: PermissionResource) => {
    return role.permissions.some(
      p => p.action === action && p.resource === resource
    );
  };

  const getActionLabel = (action: PermissionAction) => {
    const labels: Record<PermissionAction, { ar: string; en: string }> = {
      view: { ar: 'عرض', en: 'View' },
      create: { ar: 'إنشاء', en: 'Create' },
      update: { ar: 'تعديل', en: 'Update' },
      delete: { ar: 'حذف', en: 'Delete' },
      approve: { ar: 'موافقة', en: 'Approve' }
    };
    return currentLanguage === 'ar' ? labels[action].ar : labels[action].en;
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة الصلاحيات' : 'Access Control'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {currentLanguage === 'ar'
              ? 'إدارة الأدوار والصلاحيات للمستخدمين'
              : 'Manage user roles and permissions'
            }
          </p>
        </div>
        {canManageRoles() && (
          <button
            onClick={() => setShowAddRole(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'إضافة دور جديد' : 'Add New Role'}
          </button>
        )}
      </div>

      {/* قائمة الأدوار */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'الأدوار' : 'Roles'}
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                      selectedRole?.id === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {currentLanguage === 'ar' ? role.nameAr : role.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* مصفوفة الصلاحيات */}
        <div className="lg:col-span-3">
          {selectedRole ? (
            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {currentLanguage === 'ar' ? 'صلاحيات الدور' : 'Role Permissions'}:
                  {' '}
                  <span className="text-blue-600">
                    {currentLanguage === 'ar' ? selectedRole.nameAr : selectedRole.name}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {currentLanguage === 'ar' ? selectedRole.descriptionAr : selectedRole.description}
                </p>
              </div>
              <div className="p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {currentLanguage === 'ar' ? 'المورد' : 'Resource'}
                      </th>
                      {['view', 'create', 'update', 'delete', 'approve'].map((action) => (
                        <th
                          key={action}
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {getActionLabel(action as PermissionAction)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {permissionMatrix.map((resource) => (
                      <tr key={resource.resource}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {currentLanguage === 'ar' ? resource.labelAr : resource.labelEn}
                        </td>
                        {['view', 'create', 'update', 'delete', 'approve'].map((action) => {
                          const isAvailable = resource.actions.includes(action as PermissionAction);
                          return (
                            <td key={action} className="px-6 py-4 whitespace-nowrap text-center">
                              {isAvailable && (
                                <input
                                  type="checkbox"
                                  checked={hasPermission(
                                    selectedRole,
                                    action as PermissionAction,
                                    resource.resource
                                  )}
                                  onChange={() =>
                                    handlePermissionToggle(
                                      selectedRole.id,
                                      action as PermissionAction,
                                      resource.resource
                                    )
                                  }
                                  disabled={!canManageRoles()}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentLanguage === 'ar'
                  ? 'اختر دوراً لإدارة صلاحياته'
                  : 'Select a role to manage permissions'
                }
              </h3>
              <p className="text-sm text-gray-500">
                {currentLanguage === 'ar'
                  ? 'اختر دوراً من القائمة على اليمين لعرض وتعديل صلاحياته'
                  : 'Choose a role from the list on the left to view and modify its permissions'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}