export interface MaintenanceRequest {
  id: string;
  complexId: string;
  buildingId: string;
  unitId: string;
  requestedBy: string;
  type: 'plumbing' | 'electrical' | 'hvac' | 'carpentry' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  assignedTo?: string;
  notes?: string;
}

export interface HousingAction {
  id: string;
  complexId: string;
  buildingId: string;
  unitId: string;
  residentId: string;
  type: 'check_in' | 'check_out';
  status: 'pending' | 'completed';
  date: string;
  notes?: string;
  processedBy?: string;
  processedAt?: string;
}