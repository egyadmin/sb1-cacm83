export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: Permission[];
  regions?: string[];
  complexes?: string[];
};

export type Permission = 
  | 'manage_users'
  | 'manage_complexes'
  | 'manage_residents'
  | 'manage_billing'
  | 'approve_changes'
  | 'view_only';

export type Complex = {
  id: string;
  name: string;
  region: string;
  address: string;
  totalCapacity: number;
  currentOccupancy: number;
  units: Unit[];
  managers: string[];
};

export type Unit = {
  id: string;
  number: string;
  type: 'studio' | '1-bedroom' | '2-bedroom' | '3-bedroom';
  capacity: number;
  occupied: number;
  residents: Resident[];
  status: 'available' | 'occupied' | 'maintenance';
};

export type Resident = {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectId: string;
  checkIn: Date;
  checkOut?: Date;
  status: 'active' | 'temporary' | 'pending' | 'inactive';
  billingRate: number;
};

export type ApprovalRequest = {
  id: string;
  type: 'create_complex' | 'delete_complex' | 'modify_unit' | 'resident_transfer';
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  requestedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  details: Record<string, unknown>;
};