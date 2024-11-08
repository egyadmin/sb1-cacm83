import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TempWorker } from '../types/complex';

interface TempWorkerState {
  workers: TempWorker[];
  addWorker: (worker: Omit<TempWorker, 'id' | 'status'>) => void;
  updateWorker: (id: string, updates: Partial<TempWorker>) => void;
  removeWorker: (id: string) => void;
  getActiveWorkers: () => TempWorker[];
  getWorkersByProject: (projectId: string) => TempWorker[];
  getWorkersByContractor: (contractorId: string) => TempWorker[];
}

export const useTempWorkerStore = create<TempWorkerState>()(
  persist(
    (set, get) => ({
      workers: [],

      addWorker: (workerData) => {
        const newWorker: TempWorker = {
          ...workerData,
          id: Math.random().toString(36).substr(2, 9),
          status: 'active'
        };

        set(state => ({
          workers: [...state.workers, newWorker]
        }));
      },

      updateWorker: (id, updates) => {
        set(state => ({
          workers: state.workers.map(worker =>
            worker.id === id ? { ...worker, ...updates } : worker
          )
        }));
      },

      removeWorker: (id) => {
        set(state => ({
          workers: state.workers.filter(worker => worker.id !== id)
        }));
      },

      getActiveWorkers: () => {
        return get().workers.filter(worker => worker.status === 'active');
      },

      getWorkersByProject: (projectId) => {
        return get().workers.filter(worker => worker.projectId === projectId);
      },

      getWorkersByContractor: (contractorId) => {
        return get().workers.filter(worker => worker.contractorId === contractorId);
      }
    }),
    {
      name: 'temp-workers-storage'
    }
  )
);