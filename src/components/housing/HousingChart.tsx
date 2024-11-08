import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { ResidentDistribution } from '../dashboard/ResidentDistribution';
import { BillingStats } from '../dashboard/BillingStats';
import { MaintenanceOverview } from '../dashboard/MaintenanceOverview';
import { OccupancyTrends } from '../dashboard/OccupancyTrends';

export function HousingChart() {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">85%</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'نسبة الإشغال' : 'Occupancy Rate'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">2,450 / 2,800</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">28</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'المجمعات النشطة' : 'Active Complexes'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">28 / 30</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600">45</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'طلبات الصيانة' : 'Maintenance Requests'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">45 نشط</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600">12</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'الموافقات المعلقة' : 'Pending Approvals'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">12 طلب</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <OccupancyTrends currentLanguage={currentLanguage} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <ResidentDistribution currentLanguage={currentLanguage} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <BillingStats currentLanguage={currentLanguage} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <MaintenanceOverview currentLanguage={currentLanguage} />
        </div>
      </div>
    </div>
  );
}