import { z } from 'zod';

export const Room = z.object({
  id: z.string(),
  number: z.string(),
  capacity: z.number(),
  currentOccupancy: z.number(),
  status: z.enum(['available', 'occupied', 'maintenance', 'inactive']),
  type: z.enum(['single', 'double', 'triple', 'quad']),
});

export const Unit = z.object({
  id: z.string(),
  number: z.string(),
  floor: z.number(),
  rooms: z.array(Room),
  facilities: z.object({
    bathrooms: z.number(),
    kitchen: z.boolean(),
    livingRoom: z.boolean(),
  }),
  status: z.enum(['available', 'occupied', 'maintenance', 'inactive']),
});

export const Building = z.object({
  id: z.string(),
  number: z.string(),
  units: z.array(Unit),
  totalCapacity: z.number(),
  currentOccupancy: z.number(),
  location: z.string(),
  status: z.enum(['active', 'inactive', 'maintenance']),
});

export const Complex = z.object({
  id: z.string(),
  name: z.string(),
  nameEn: z.string(),
  region: z.string(),
  buildings: z.array(Building),
  totalCapacity: z.number(),
  currentOccupancy: z.number(),
  monthlyRate: z.number(),
  status: z.enum(['active', 'inactive']),
  managers: z.array(z.string()),
  approvalStatus: z.enum(['pending', 'approved', 'rejected']),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TempWorker = z.object({
  id: z.string(),
  name: z.string(),
  nationalId: z.string(),
  projectId: z.string(),
  contractorId: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

export const ResidentTransfer = z.object({
  id: z.string(),
  residentId: z.string(),
  fromComplexId: z.string(),
  toComplexId: z.string(),
  reason: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
  requestedBy: z.string(),
  requestedAt: z.string(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
});

export const ComplexBilling = z.object({
  id: z.string(),
  complexId: z.string(),
  projectId: z.string(),
  month: z.string(),
  year: z.number(),
  totalResidents: z.number(),
  ratePerPerson: z.number(),
  totalAmount: z.number(),
  status: z.enum(['draft', 'pending', 'approved', 'paid']),
  createdAt: z.string(),
  paidAt: z.string().optional(),
});

export type Room = z.infer<typeof Room>;
export type Unit = z.infer<typeof Unit>;
export type Building = z.infer<typeof Building>;
export type Complex = z.infer<typeof Complex>;
export type TempWorker = z.infer<typeof TempWorker>;
export type ResidentTransfer = z.infer<typeof ResidentTransfer>;
export type ComplexBilling = z.infer<typeof ComplexBilling>;