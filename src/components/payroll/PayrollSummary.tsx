import React from 'react';
import { DollarSign, Users, Clock, Calendar } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface PayrollSummaryProps {
  stats: {
    totalEmployees: number;
    totalSalaries: number;
    pendingApprovals: number;
    lastProcessed: string;
  };
}

export function PayrollSummary({ stats }: PayrollSummaryProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {stats.totalEmployees}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'إجمالي الرواتب' : 'Total Salaries'}
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {stats.totalSalaries.toLocaleString()} SAR
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'موافقات معلقة' : 'Pending Approvals'}
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {stats.pendingApprovals}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'آخر معالجة' : 'Last Processed'}
                </dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {new Date(stats.lastProcessed).toLocaleDateString(
                    currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
                    { month: 'short', day: 'numeric' }
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}