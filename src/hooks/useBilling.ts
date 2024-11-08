import { useBillingStore } from '../store/useBillingStore';
import { useComplexStore } from '../store/useComplexStore';
import type { ComplexBilling } from '../types/complex';

export function useBilling() {
  const { generateBill, updateBillStatus, getBillsByComplex } = useBillingStore();
  const { getComplexById } = useComplexStore();

  const calculateBill = (complexId: string, month: string, year: number) => {
    const complex = getComplexById(complexId);
    if (!complex) throw new Error('Complex not found');

    const ratePerPerson = complex.monthlyRate;
    const totalResidents = complex.currentOccupancy;
    const totalAmount = ratePerPerson * totalResidents;

    return {
      complexId,
      month,
      year,
      totalResidents,
      ratePerPerson,
      totalAmount
    };
  };

  const createBill = async (data: Omit<ComplexBilling, 'id' | 'status' | 'createdAt'>) => {
    return generateBill(data);
  };

  return {
    calculateBill,
    createBill,
    updateBillStatus,
    getBillsByComplex,
    getBillingSummary: (complexId: string) => {
      const bills = getBillsByComplex(complexId);
      return {
        totalBilled: bills.reduce((sum, bill) => sum + bill.totalAmount, 0),
        totalPaid: bills.filter(bill => bill.status === 'paid')
          .reduce((sum, bill) => sum + bill.totalAmount, 0),
        pendingAmount: bills.filter(bill => bill.status === 'pending' || bill.status === 'approved')
          .reduce((sum, bill) => sum + bill.totalAmount, 0)
      };
    }
  };
}