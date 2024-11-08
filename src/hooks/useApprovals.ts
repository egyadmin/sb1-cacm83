import { useApprovalStore } from '../store/useApprovalStore';
import { useAuthStore } from '../store/useAuthStore';
import type { ApprovalType } from '../types/approval';

export function useApprovals() {
  const { createRequest, updateRequest, getRequestsByType } = useApprovalStore();
  const { currentUser } = useAuthStore();

  const requestApproval = async (type: ApprovalType, details: Record<string, unknown>) => {
    if (!currentUser) throw new Error('User must be authenticated');
    return createRequest(type, currentUser.id, details);
  };

  const handleApproval = async (requestId: string, approved: boolean, notes?: string) => {
    if (!currentUser) throw new Error('User must be authenticated');
    return updateRequest(requestId, approved ? 'approved' : 'rejected', currentUser.id, notes);
  };

  return {
    requestApproval,
    approveRequest: (requestId: string, notes?: string) => handleApproval(requestId, true, notes),
    rejectRequest: (requestId: string, notes?: string) => handleApproval(requestId, false, notes),
    getPendingApprovals: () => getRequestsByType('pending'),
    getApprovalsByType: getRequestsByType
  };
}