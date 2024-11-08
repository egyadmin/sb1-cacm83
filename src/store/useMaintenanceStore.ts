import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MaintenanceRequest {
  id: string;
  complexId: string;
  buildingId: string;
  residentId: string;
  type: 'ac' | 'electrical' | 'plumbing' | 'kitchen' | 'other';
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface MaintenanceState {
  requests: MaintenanceRequest[];
  addRequest: (request: Omit<MaintenanceRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateRequest: (id: string, updates: Partial<MaintenanceRequest>) => void;
  getRequestsByComplex: (complexId: string) => MaintenanceRequest[];
}

export const useMaintenanceStore = create<MaintenanceState>()(
  persist(
    (set, get) => ({
      requests: [],
      addRequest: (requestData) => {
        const newRequest: MaintenanceRequest = {
          ...requestData,
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          requests: [...state.requests, newRequest]
        }));
      },
      updateRequest: (id, updates) => {
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? { ...request, ...updates, updatedAt: new Date().toISOString() }
              : request
          )
        }));
      },
      getRequestsByComplex: (complexId) => {
        return get().requests.filter(request => request.complexId === complexId);
      }
    }),
    {
      name: 'maintenance-storage'
    }
  )
);