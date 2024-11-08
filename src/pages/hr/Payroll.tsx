import React, { useState } from 'react';
import { DollarSign, Search, Filter, Download, Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { NewPayrollModal } from '../../components/payroll/NewPayrollModal';
import { PayrollSummary } from '../../components/payroll/PayrollSummary';

export function Payroll() {
  const { currentLanguage } = useLanguageStore();
  const [showNewPayrollModal, setShowNewPayrollModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const payrollStats = {
    totalEmployees: 245,
    totalSalaries: 875000,
    pendingApprovals: 12,
    lastProcessed: '2024-03-15'
  };

  const payrollRecords = [
    {
      id: 'PR-2024-03',
      month: 'March 2024',
      totalEmployees: 245,
      totalAmount: 875000,
      status: 'pending',
      processedDate: '2024-03-15'
    },
    // Add more sample records as needed
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      processed: 'bg-blue-100 text-blue-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'مسير الرواتب' : 'Payroll Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة رواتب الموظفين والبدلات والخصومات'
              : 'Manage employee salaries, allowances, and deductions'
            }
          </p>
        </div>
        <button
          onClick={() => setShowNewPayrollModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'مسير رواتب جديد' : 'New Payroll'}
        </button>
      </div>

      <PayrollSummary stats={payrollStats} />

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'ar' ? 'بحث في السجلات...' : 'Search records...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">
                  {currentLanguage === 'ar' ? 'جميع الشهور' : 'All Months'}
                </option>
                <option value="2024-03">March 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-01">January 2024</option>
              </select>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                {currentLanguage === 'ar' ? 'تصدير' : 'Export'}
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'رقم المسير' : 'Payroll ID'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الشهر' : 'Month'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'عدد الموظفين' : 'Employees'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'إجمالي المبلغ' : 'Total Amount'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payrollRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.totalEmployees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.totalAmount.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                        {currentLanguage === 'ar' 
                          ? record.status === 'pending' ? 'معلق' : 'مكتمل'
                          : record.status.charAt(0).toUpperCase() + record.status.slice(1)
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        {currentLanguage === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showNewPayrollModal && (
        <NewPayrollModal onClose={() => setShowNewPayrollModal(false)} />
      )}
    </div>
  );
}