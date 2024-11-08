import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QueryState {
  queries: Record<string, unknown>;
  setQueryData: (key: string, data: unknown) => void;
  getQueryData: (key: string) => unknown;
  invalidateQuery: (key: string) => void;
}

export const useQueryStore = create<QueryState>()(
  persist(
    (set, get) => ({
      queries: {},
      setQueryData: (key, data) =>
        set((state) => ({
          queries: { ...state.queries, [key]: data }
        })),
      getQueryData: (key) => get().queries[key],
      invalidateQuery: (key) =>
        set((state) => {
          const { [key]: _, ...rest } = state.queries;
          return { queries: rest };
        })
    }),
    {
      name: 'query-store'
    }
  )
);