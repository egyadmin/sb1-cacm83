import { useApprovalStore } from '../store/useApprovalStore';
import { useAuthStore } from '../store/useAuthStore';
import type { ApprovalType } from '../types/approval';

export function useApprovalWorkflow() {
  const { createRequest, updateRequest } = useApprovalStore();
  const { currentUser } = useAuthStore();

  const requestApproval = async (
    type: ApprovalType,
    details: Record<string, unknown>
  ) => {
    if (!currentUser) {
      throw new Error('User must be authenticated to request approval');
    }

    return createRequest(type, currentUser.id, details);
  };

  const approveRequest = async (
    requestId: string,
    notes?: string
  ) => {
    if (!currentUser) {
      throw new Error('User must be authenticated to approve requests');
    }

    return updateRequest(requestId, 'approved', currentUser.id, notes);
  };

  const rejectRequest = async (
    requestId: string,
    notes?: string
  ) => {
    if (!currentUser) {
      throw new Error('User must be authenticated to reject requests');
    }

    return updateRequest(requestId, 'rejected', currentUser.id, notes);
  };

  return {
    requestApproval,
    approveRequest,
    rejectRequest
  };
}