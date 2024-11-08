import { usePermissionStore } from '../store/usePermissionStore';
import { useAuthStore } from '../store/useAuthStore';

export function useComplexPermissions(complexId?: string) {
  const { currentUser } = useAuthStore();
  const { hasPermission } = usePermissionStore();

  if (!currentUser) {
    return {
      canView: false,
      canManage: false,
      canApprove: false,
      canDelete: false,
      canManageResidents: false,
      canManageBilling: false
    };
  }

  return {
    canView: hasPermission(currentUser.id, 'view_complexes', complexId),
    canManage: hasPermission(currentUser.id, 'manage_complexes', complexId),
    canApprove: hasPermission(currentUser.id, 'approve_changes', complexId),
    canDelete: hasPermission(currentUser.id, 'delete_records', complexId),
    canManageResidents: hasPermission(currentUser.id, 'manage_residents', complexId),
    canManageBilling: hasPermission(currentUser.id, 'manage_billing', complexId)
  };
}