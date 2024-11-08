import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ResidentHistory {
  type: 'check_in' | 'transfer' | 'maintenance' | 'other';
  date: string;
  description: string;
}

interface Resident {
  id: string;
  name: string;
  employeeId: string;
  iqamaNumber: string;
  jobTitle: string;
  complexId: string;
  complexName: string;
  buildingId: string;
  buildingNumber: string;
  unitId: string;
  status: 'active' | 'temporary' | 'inactive';
  checkInDate: string;
  checkOutDate?: string;
  history?: ResidentHistory[];
}

interface ResidentState {
  residents: Resident[];
  addResident: (resident: Omit<Resident, 'id' | 'history'>) => void;
  updateResident: (id: string, updates: Partial<Resident>) => void;
  getResidentById: (id: string) => Resident | undefined;
  getResidentsByComplex: (complexId: string) => Resident[];
  getActiveResidents: () => Resident[];
  addResidentHistory: (id: string, event: ResidentHistory) => void;
}

export const useResidentStore = create<ResidentState>()(
  persist(
    (set, get) => ({
      residents: [],
      
      addResident: (residentData) => {
        const newResident: Resident = {
          ...residentData,
          id: Math.random().toString(36).substr(2, 9),
          history: [{
            type: 'check_in',
            date: new Date().toISOString(),
            description: 'Initial check-in'
          }]
        };
        
        set((state) => ({
          residents: [...state.residents, newResident]
        }));
      },

      updateResident: (id, updates) => {
        set((state) => ({
          residents: state.residents.map((resident) =>
            resident.id === id ? { ...resident, ...updates } : resident
          )
        }));
      },

      getResidentById: (id) => {
        return get().residents.find((resident) => resident.id === id);
      },

      getResidentsByComplex: (complexId) => {
        return get().residents.filter((resident) => resident.complexId === complexId);
      },

      getActiveResidents: () => {
        return get().residents.filter((resident) => resident.status === 'active');
      },

      addResidentHistory: (id, event) => {
        set((state) => ({
          residents: state.residents.map((resident) =>
            resident.id === id
              ? {
                  ...resident,
                  history: [...(resident.history || []), event]
                }
              : resident
          )
        }));
      }
    }),
    {
      name: 'resident-storage'
    }
  )
);