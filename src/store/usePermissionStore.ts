import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Permission, Role, UserRole, PermissionAction, PermissionResource, PermissionScope } from '../types/permissions';

interface PermissionState {
  roles: Role[];
  userRoles: UserRole[];
  permissions: Permission[];
  
  // إدارة الأدوار
  addRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRole: (id: string, updates: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  getRoleById: (id: string) => Role | undefined;
  getRolesByLevel: (level: number) => Role[];
  
  // إدارة صلاحيات المستخدمين
  assignRole: (userId: string, roleId: string, assignedBy: string) => void;
  removeRole: (userId: string, roleId: string) => void;
  getUserRoles: (userId: string) => Role[];
  
  // إدارة الصلاحيات
  grantPermission: (
    roleId: string,
    action: PermissionAction,
    resource: PermissionResource,
    scope: { type: PermissionScope; id?: string },
    grantedBy: string
  ) => void;
  revokePermission: (roleId: string, permissionId: string) => void;
  
  // التحقق من الصلاحيات
  hasPermission: (
    userId: string,
    action: PermissionAction,
    resource: PermissionResource,
    scopeId?: string
  ) => boolean;
  
  // الاستعلام عن الصلاحيات
  getRolePermissions: (roleId: string) => Permission[];
  getUserPermissions: (userId: string) => Permission[];
}

const defaultRoles: Role[] = [
  {
    id: 'super-admin',
    name: 'Super Administrator',
    nameAr: 'مدير النظام',
    description: 'Full system access with all permissions',
    descriptionAr: 'صلاحية كاملة للنظام',
    permissions: [],
    level: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'housing-manager',
    name: 'Housing Manager',
    nameAr: 'مدير الإسكان',
    description: 'Manage housing complexes and residents',
    descriptionAr: 'إدارة المجمعات السكنية والمقيمين',
    permissions: [],
    level: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'maintenance-supervisor',
    name: 'Maintenance Supervisor',
    nameAr: 'مشرف الصيانة',
    description: 'Manage maintenance requests and tasks',
    descriptionAr: 'إدارة طلبات ومهام الصيانة',
    permissions: [],
    level: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const usePermissionStore = create<PermissionState>()(
  persist(
    (set, get) => ({
      roles: defaultRoles,
      userRoles: [],
      permissions: [],

      addRole: (roleData) => {
        const newRole: Role = {
          ...roleData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          roles: [...state.roles, newRole]
        }));
      },

      updateRole: (id, updates) => {
        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === id
              ? { ...role, ...updates, updatedAt: new Date().toISOString() }
              : role
          )
        }));
      },

      deleteRole: (id) => {
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== id),
          userRoles: state.userRoles.filter((ur) => ur.roleId !== id)
        }));
      },

      getRoleById: (id) => {
        return get().roles.find((role) => role.id === id);
      },

      getRolesByLevel: (level) => {
        return get().roles.filter((role) => role.level === level);
      },

      assignRole: (userId, roleId, assignedBy) => {
        const newUserRole: UserRole = {
          userId,
          roleId,
          assignedAt: new Date().toISOString(),
          assignedBy
        };
        set((state) => ({
          userRoles: [...state.userRoles, newUserRole]
        }));
      },

      removeRole: (userId, roleId) => {
        set((state) => ({
          userRoles: state.userRoles.filter(
            (ur) => !(ur.userId === userId && ur.roleId === roleId)
          )
        }));
      },

      getUserRoles: (userId) => {
        const userRoleIds = get().userRoles
          .filter((ur) => ur.userId === userId)
          .map((ur) => ur.roleId);
        return get().roles.filter((role) => userRoleIds.includes(role.id));
      },

      grantPermission: (roleId, action, resource, scope, grantedBy) => {
        const newPermission: Permission = {
          id: Math.random().toString(36).substr(2, 9),
          action,
          resource,
          scope,
          grantedAt: new Date().toISOString(),
          grantedBy
        };

        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === roleId
              ? { ...role, permissions: [...role.permissions, newPermission] }
              : role
          )
        }));
      },

      revokePermission: (roleId, permissionId) => {
        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === roleId
              ? {
                  ...role,
                  permissions: role.permissions.filter((p) => p.id !== permissionId)
                }
              : role
          )
        }));
      },

      hasPermission: (userId, action, resource, scopeId) => {
        const userRoles = get().getUserRoles(userId);
        
        // المدير العام لديه جميع الصلاحيات
        if (userRoles.some((role) => role.id === 'super-admin')) {
          return true;
        }

        return userRoles.some((role) =>
          role.permissions.some((permission) => {
            if (permission.action !== action || permission.resource !== resource) {
              return false;
            }

            if (permission.scope.type === 'all') {
              return true;
            }

            return !scopeId || permission.scope.id === scopeId;
          })
        );
      },

      getRolePermissions: (roleId) => {
        const role = get().getRoleById(roleId);
        return role?.permissions || [];
      },

      getUserPermissions: (userId) => {
        const userRoles = get().getUserRoles(userId);
        return userRoles.flatMap((role) => role.permissions);
      }
    }),
    {
      name: 'permissions-storage'
    }
  )
);