import { z } from 'zod';

export const ResidentSchema = z.object({
  id: z.string(),
  name: z.string(),
  employeeId: z.string(),
  jobTitle: z.string(),
  complexId: z.string(),
  buildingId: z.string(),
  unitId: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string().optional(),
  status: z.enum(['active', 'checked_out']),
});

export type Resident = z.infer<typeof ResidentSchema>;

export const MaintenanceRequestSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  complexId: z.string(),
  buildingId: z.string(),
  unitId: z.string(),
  type: z.enum(['ac', 'electrical', 'plumbing', 'kitchen', 'other']),
  description: z.string(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().optional(),
});

export type MaintenanceRequest = z.infer<typeof MaintenanceRequestSchema>;