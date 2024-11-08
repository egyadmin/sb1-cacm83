import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JobPositionFormData } from '../components/recruitment/AddPositionModal';

interface JobPosition extends JobPositionFormData {
  id: string;
  status: 'active' | 'pending' | 'closed';
  applications: number;
  createdAt: string;
}

interface JobState {
  positions: JobPosition[];
  addPosition: (position: JobPositionFormData) => void;
  updatePosition: (id: string, updates: Partial<JobPosition>) => void;
  deletePosition: (id: string) => void;
  getPosition: (id: string) => JobPosition | undefined;
}

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      positions: [],
      addPosition: (positionData) => {
        const newPosition: JobPosition = {
          ...positionData,
          id: Math.random().toString(36).substr(2, 9),
          status: 'active',
          applications: 0,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          positions: [...state.positions, newPosition]
        }));
      },
      updatePosition: (id, updates) => {
        set((state) => ({
          positions: state.positions.map((position) =>
            position.id === id ? { ...position, ...updates } : position
          )
        }));
      },
      deletePosition: (id) => {
        set((state) => ({
          positions: state.positions.filter((position) => position.id !== id)
        }));
      },
      getPosition: (id) => {
        return get().positions.find((position) => position.id === id);
      }
    }),
    {
      name: 'job-storage'
    }
  )
);