import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Complex, Building, Unit, Room, TempWorker, ResidentTransfer, ComplexBilling } from '../types/complex';
import type { ApprovalRequest } from '../types/approval';

interface ComplexState {
  complexes: Complex[];
  tempWorkers: TempWorker[];
  transfers: ResidentTransfer[];
  billings: ComplexBilling[];
  approvals: ApprovalRequest[];
  
  // Complex Management
  addComplex: (complex: Omit<Complex, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateComplex: (id: string, updates: Partial<Complex>) => void;
  deleteComplex: (id: string) => void;
  
  // Building Management
  addBuilding: (complexId: string, building: Omit<Building, 'id'>) => void;
  updateBuilding: (complexId: string, buildingId: string, updates: Partial<Building>) => void;
  deleteBuilding: (complexId: string, buildingId: string) => void;
  
  // Unit Management
  addUnit: (complexId: string, buildingId: string, unit: Omit<Unit, 'id'>) => void;
  updateUnit: (complexId: string, buildingId: string, unitId: string, updates: Partial<Unit>) => void;
  deleteUnit: (complexId: string, buildingId: string, unitId: string) => void;
  
  // Room Management
  updateRoom: (
    complexId: string,
    buildingId: string,
    unitId: string,
    roomId: string,
    updates: Partial<Room>
  ) => void;
  
  // Temporary Workers
  addTempWorker: (worker: Omit<TempWorker, 'id'>) => void;
  updateTempWorker: (id: string, updates: Partial<TempWorker>) => void;
  deleteTempWorker: (id: string) => void;
  
  // Resident Transfers
  requestTransfer: (transfer: Omit<ResidentTransfer, 'id' | 'status' | 'requestedAt'>) => void;
  approveTransfer: (id: string, approverId: string) => void;
  rejectTransfer: (id: string, approverId: string) => void;
  
  // Billing
  generateBill: (billing: Omit<ComplexBilling, 'id' | 'createdAt'>) => void;
  updateBillStatus: (id: string, status: ComplexBilling['status'], paidAt?: string) => void;
  
  // Approvals
  createApprovalRequest: (request: Omit<ApprovalRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateApprovalStatus: (
    id: string,
    status: 'approved' | 'rejected',
    userId: string,
    notes?: string
  ) => void;
  
  // Queries
  getComplexById: (id: string) => Complex | undefined;
  getComplexesByRegion: (region: string) => Complex[];
  getAvailableRooms: (complexId: string) => Room[];
  getTotalCapacity: (complexId: string) => number;
  getCurrentOccupancy: (complexId: string) => number;
  getPendingApprovals: () => ApprovalRequest[];
  getBillingsByProject: (projectId: string) => ComplexBilling[];
}

export const useComplexStore = create<ComplexState>()(
  persist(
    (set, get) => ({
      complexes: [],
      tempWorkers: [],
      transfers: [],
      billings: [],
      approvals: [],

      // Implementation of all the methods...
      addComplex: (complexData) => {
        const newComplex: Complex = {
          ...complexData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ complexes: [...state.complexes, newComplex] }));
      },

      // ... implement all other methods similarly
      
      // Example implementation of a query method
      getComplexById: (id) => {
        return get().complexes.find(c => c.id === id);
      },

      getComplexesByRegion: (region) => {
        return get().complexes.filter(c => c.region === region);
      },

      // ... implement remaining methods
    }),
    {
      name: 'complex-storage',
    }
  )
);