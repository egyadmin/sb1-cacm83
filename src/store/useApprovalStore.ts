import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ApprovalRequest, ApprovalType, ApprovalStatus } from '../types/approval';

interface ApprovalState {
  requests: ApprovalRequest[];
  createRequest: (type: ApprovalType, requesterId: string, details: Record<string, unknown>) => void;
  updateRequest: (id: string, status: ApprovalStatus, userId: string, notes?: string) => void;
  getRequestsByType: (type: ApprovalType) => ApprovalRequest[];
  getPendingRequests: () => ApprovalRequest[];
  getRequestsByUser: (userId: string) => ApprovalRequest[];
}

export const useApprovalStore = create<ApprovalState>()(
  persist(
    (set, get) => ({
      requests: [],

      createRequest: (type, requesterId, details) => {
        const newRequest: ApprovalRequest = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          requesterId,
          status: 'pending',
          details,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        set(state => ({
          requests: [...state.requests, newRequest]
        }));

        return newRequest;
      },

      updateRequest: (id, status, userId, notes) => {
        set(state => ({
          requests: state.requests.map(request =>
            request.id === id
              ? {
                  ...request,
                  status,
                  notes,
                  updatedAt: new Date().toISOString(),
                  ...(status === 'approved'
                    ? { approvedBy: userId, approvedAt: new Date().toISOString() }
                    : status === 'rejected'
                    ? { rejectedBy: userId, rejectedAt: new Date().toISOString() }
                    : {})
                }
              : request
          )
        }));
      },

      getRequestsByType: (type) => {
        return get().requests.filter(request => request.type === type);
      },

      getPendingRequests: () => {
        return get().requests.filter(request => request.status === 'pending');
      },

      getRequestsByUser: (userId) => {
        return get().requests.filter(request => request.requesterId === userId);
      }
    }),
    {
      name: 'approvals-storage'
    }
  )
);