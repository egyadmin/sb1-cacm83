import { usePermissionStore } from '../store/usePermissionStore';
import { useAuthStore } from '../store/useAuthStore';
import type { PermissionAction, PermissionResource } from '../types/permissions';

export function usePermissions() {
  const { currentUser } = useAuthStore();
  const { hasPermission, getUserRoles, getUserPermissions } = usePermissionStore();

  const checkPermission = (
    action: PermissionAction,
    resource: PermissionResource,
    scopeId?: string
  ) => {
    if (!currentUser) return false;
    return hasPermission(currentUser.id, action, resource, scopeId);
  };

  const getUserAccessLevel = () => {
    if (!currentUser) return -1;
    const roles = getUserRoles(currentUser.id);
    return Math.min(...roles.map(role => role.level));
  };

  return {
    // التحقق من صلاحيات محددة
    canView: (resource: PermissionResource, scopeId?: string) =>
      checkPermission('view', resource, scopeId),
    canCreate: (resource: PermissionResource, scopeId?: string) =>
      checkPermission('create', resource, scopeId),
    canUpdate: (resource: PermissionResource, scopeId?: string) =>
      checkPermission('update', resource, scopeId),
    canDelete: (resource: PermissionResource, scopeId?: string) =>
      checkPermission('delete', resource, scopeId),
    canApprove: (resource: PermissionResource, scopeId?: string) =>
      checkPermission('approve', resource, scopeId),

    // صلاحيات محددة للنظام
    canManageUsers: () => checkPermission('create', 'users'),
    canManageRoles: () => checkPermission('update', 'users'),
    canManageComplexes: (complexId?: string) =>
      checkPermission('update', 'complexes', complexId),
    canManageResidents: (complexId?: string) =>
      checkPermission('update', 'residents', complexId),
    canManageMaintenance: (complexId?: string) =>
      checkPermission('update', 'maintenance', complexId),
    canViewReports: () => checkPermission('view', 'reports'),
    canManageBilling: (complexId?: string) =>
      checkPermission('update', 'billing', complexId),

    // معلومات إضافية
    getUserAccessLevel,
    getUserRoles: () => currentUser ? getUserRoles(currentUser.id) : [],
    getUserPermissions: () => currentUser ? getUserPermissions(currentUser.id) : [],
    
    // التحقق المباشر من الصلاحيات
    checkPermission
  };
}