import { z } from 'zod';

export const ApprovalType = z.enum([
  'create_complex',
  'delete_complex',
  'modify_unit',
  'resident_checkin',
  'resident_checkout',
  'resident_transfer',
  'temp_worker_registration'
]);

export const ApprovalStatus = z.enum([
  'pending',
  'approved',
  'rejected'
]);

export const ApprovalRequest = z.object({
  id: z.string(),
  type: ApprovalType,
  requesterId: z.string(),
  status: ApprovalStatus,
  details: z.record(z.unknown()),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  rejectedBy: z.string().optional(),
  rejectedAt: z.string().optional(),
});

export type ApprovalType = z.infer<typeof ApprovalType>;
export type ApprovalStatus = z.infer<typeof ApprovalStatus>;
export type ApprovalRequest = z.infer<typeof ApprovalRequest>;