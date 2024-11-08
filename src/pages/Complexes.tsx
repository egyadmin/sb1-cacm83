import React, { useState } from 'react';
import { Building2, Search, Filter, Download, Plus } from 'lucide-react';
import { BranchComplexes } from '../components/complexes/BranchComplexes';
import { AddComplexModal } from '../components/complexes/AddComplexModal';
import { useComplexStore } from '../store/useComplexStore';
import { useBranchStore } from '../store/useBranchStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { usePermissions } from '../hooks/usePermissions';
import { ComplexChart } from '../components/complexes/ComplexChart';
import type { Complex } from '../store/useComplexStore';

export function Complexes() {
  const { currentLanguage } = useLanguageStore();
  const { complexes, addComplex } = useComplexStore();
  const { branches } = useBranchStore();
  const { canManageComplexes } = usePermissions();
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [showAddComplex, setShowAddComplex] = useState(false);
  const [editingComplex, setEditingComplex] = useState<Complex | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(true);

  // Filter active branches only
  const activeBranches = branches.filter(branch => branch.status === 'active');

  // Get complexes for each branch
  const branchesWithComplexes = activeBranches.map(branch => ({
    ...branch,
    complexes: complexes.filter(complex => complex.branchId === branch.id)
  }));

  const filteredBranches = selectedBranch === 'all' 
    ? branchesWithComplexes 
    : branchesWithComplexes.filter(branch => branch.id === selectedBranch);

  const handleAddComplex = (complexData: Omit<Complex, 'id' | 'currentOccupancy'>) => {
    addComplex(complexData);
    setShowAddComplex(false);
  };

  const handleEditComplex = (complex: Complex) => {
    setEditingComplex(complex);
    setShowAddComplex(true);
  };

  const totalComplexes = complexes.length;
  const totalCapacity = complexes.reduce((sum, complex) => sum + complex.totalCapacity, 0);
  const totalOccupancy = complexes.reduce((sum, complex) => sum + complex.currentOccupancy, 0);
  const occupancyRate = totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة المجمعات السكنية' : 'Housing Complexes Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة المباني المستأجرة ومتابعة الإشغال'
              : 'Manage rented buildings and monitor occupancy'
            }
          </p>
        </div>
        {canManageComplexes() && (
          <button
            onClick={() => setShowAddComplex(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'إضافة مجمع سكني' : 'Add Complex'}
          </button>
        )}
      </div>

      {/* Statistics Overview */}
      {showStats && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Building2 className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {currentLanguage === 'ar' ? 'إجمالي المجمعات' : 'Total Complexes'}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">{totalComplexes}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Building2 className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {currentLanguage === 'ar' ? 'السعة الإجمالية' : 'Total Capacity'}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">{totalCapacity}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Building2 className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {currentLanguage === 'ar' ? 'الإشغال الحالي' : 'Current Occupancy'}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">{totalOccupancy}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Building2 className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {currentLanguage === 'ar' ? 'نسبة الإشغال' : 'Occupancy Rate'}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {Math.round(occupancyRate)}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={currentLanguage === 'ar' ? 'بحث في المجمعات...' : 'Search complexes...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">
                {currentLanguage === 'ar' ? 'جميع الفروع' : 'All Branches'}
              </option>
              {activeBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {currentLanguage === 'ar' ? branch.name : branch.nameEn}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              {currentLanguage === 'ar' ? 'تصفية' : 'Filter'}
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              {currentLanguage === 'ar' ? 'تصدير' : 'Export'}
            </button>
          </div>
        </div>
      </div>

      {/* Complexes List */}
      <div className="space-y-8">
        {filteredBranches.map(branch => (
          <BranchComplexes 
            key={branch.id} 
            branch={branch}
            onEditComplex={handleEditComplex}
          />
        ))}
      </div>

      {/* Add/Edit Complex Modal */}
      {showAddComplex && (
        <AddComplexModal
          complex={editingComplex}
          onClose={() => {
            setShowAddComplex(false);
            setEditingComplex(null);
          }}
          onSubmit={handleAddComplex}
          branches={activeBranches}
        />
      )}
    </div>
  );
}