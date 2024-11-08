import { z } from 'zod';

export const PermissionScope = z.enum([
  'all',           // كافة الصلاحيات
  'complex',       // مجمع محدد
  'branch',        // فرع محدد
  'department'     // قسم محدد
]);

export const PermissionAction = z.enum([
  'view',          // عرض
  'create',        // إنشاء
  'update',        // تحديث
  'delete',        // حذف
  'approve'        // موافقة
]);

export const PermissionResource = z.enum([
  'users',         // المستخدمين
  'complexes',     // المجمعات
  'residents',     // المقيمين
  'maintenance',   // الصيانة
  'billing',       // الفواتير
  'reports',       // التقارير
  'approvals'      // الموافقات
]);

export const Permission = z.object({
  id: z.string(),
  action: PermissionAction,
  resource: PermissionResource,
  scope: z.object({
    type: PermissionScope,
    id: z.string().optional()
  }),
  conditions: z.record(z.unknown()).optional(),
  grantedAt: z.string(),
  grantedBy: z.string(),
  expiresAt: z.string().optional()
});

export const Role = z.object({
  id: z.string(),
  name: z.string(),
  nameAr: z.string(),
  description: z.string(),
  descriptionAr: z.string(),
  permissions: z.array(Permission),
  level: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const UserRole = z.object({
  userId: z.string(),
  roleId: z.string(),
  assignedAt: z.string(),
  assignedBy: z.string(),
  expiresAt: z.string().optional()
});

export type PermissionScope = z.infer<typeof PermissionScope>;
export type PermissionAction = z.infer<typeof PermissionAction>;
export type PermissionResource = z.infer<typeof PermissionResource>;
export type Permission = z.infer<typeof Permission>;
export type Role = z.infer<typeof Role>;
export type UserRole = z.infer<typeof UserRole>;