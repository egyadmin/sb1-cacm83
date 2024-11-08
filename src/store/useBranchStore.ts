import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Branch, initialBranches } from '../types/branch';

interface BranchState {
  branches: Branch[];
  addBranch: (branch: Omit<Branch, 'id'>) => void;
  updateBranch: (id: string, updates: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
  getBranch: (id: string) => Branch | undefined;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set, get) => ({
      branches: initialBranches,
      addBranch: (branchData) => {
        const newBranch: Branch = {
          ...branchData,
          id: Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({
          branches: [...state.branches, newBranch],
        }));
      },
      updateBranch: (id, updates) => {
        set((state) => ({
          branches: state.branches.map((branch) =>
            branch.id === id ? { ...branch, ...updates } : branch
          ),
        }));
      },
      deleteBranch: (id) => {
        set((state) => ({
          branches: state.branches.filter((branch) => branch.id !== id),
        }));
      },
      getBranch: (id) => {
        return get().branches.find((branch) => branch.id === id);
      },
    }),
    {
      name: 'branch-storage',
    }
  )
);