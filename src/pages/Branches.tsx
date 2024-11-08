import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useBranchStore } from '../store/useBranchStore';
import { BranchList } from '../components/branches/BranchList';
import { BranchForm } from '../components/branches/BranchForm';
import { Branch } from '../types/branch';

export function Branches() {
  const { currentLanguage } = useLanguageStore();
  const { addBranch, updateBranch, deleteBranch } = useBranchStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>();

  const handleAddBranch = (branchData: Omit<Branch, 'id'>) => {
    addBranch(branchData);
    setShowForm(false);
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setShowForm(true);
  };

  const handleUpdateBranch = (branchData: Omit<Branch, 'id'>) => {
    if (selectedBranch) {
      updateBranch(selectedBranch.id, branchData);
      setShowForm(false);
      setSelectedBranch(undefined);
    }
  };

  const handleDeleteBranch = (branchId: string) => {
    if (confirm(currentLanguage === 'ar' ? 'هل أنت متأكد من حذف هذا الفرع؟' : 'Are you sure you want to delete this branch?')) {
      deleteBranch(branchId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة الفروع' : 'Branch Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة فروع الشركة ومواقعها'
              : 'Manage company branches and locations'
            }
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBranch(undefined);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'إضافة فرع' : 'Add Branch'}
        </button>
      </div>

      <BranchList
        onEdit={handleEditBranch}
        onDelete={handleDeleteBranch}
      />

      {showForm && (
        <BranchForm
          branch={selectedBranch}
          onSubmit={selectedBranch ? handleUpdateBranch : handleAddBranch}
          onClose={() => {
            setShowForm(false);
            setSelectedBranch(undefined);
          }}
        />
      )}
    </div>
  );
}