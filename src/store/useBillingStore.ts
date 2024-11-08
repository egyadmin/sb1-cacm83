import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ComplexBilling } from '../types/complex';

interface BillingState {
  billings: ComplexBilling[];
  generateBill: (billing: Omit<ComplexBilling, 'id' | 'status' | 'createdAt'>) => void;
  updateBillStatus: (id: string, status: ComplexBilling['status'], paidAt?: string) => void;
  getBillsByComplex: (complexId: string) => ComplexBilling[];
  getBillsByProject: (projectId: string) => ComplexBilling[];
  getPendingBills: () => ComplexBilling[];
}

export const useBillingStore = create<BillingState>()(
  persist(
    (set, get) => ({
      billings: [],

      generateBill: (billingData) => {
        const newBilling: ComplexBilling = {
          ...billingData,
          id: Math.random().toString(36).substr(2, 9),
          status: 'draft',
          createdAt: new Date().toISOString()
        };

        set(state => ({
          billings: [...state.billings, newBilling]
        }));
      },

      updateBillStatus: (id, status, paidAt) => {
        set(state => ({
          billings: state.billings.map(bill =>
            bill.id === id
              ? { ...bill, status, ...(paidAt ? { paidAt } : {}) }
              : bill
          )
        }));
      },

      getBillsByComplex: (complexId) => {
        return get().billings.filter(bill => bill.complexId === complexId);
      },

      getBillsByProject: (projectId) => {
        return get().billings.filter(bill => bill.projectId === projectId);
      },

      getPendingBills: () => {
        return get().billings.filter(bill => 
          bill.status === 'pending' || bill.status === 'approved'
        );
      }
    }),
    {
      name: 'billing-storage'
    }
  )
);