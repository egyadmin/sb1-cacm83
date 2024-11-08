import React, { useState } from 'react';
import { Building2, Users, DollarSign, Map, Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, Briefcase, UserPlus } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useAuthStore } from '../store/useAuthStore';
import { useBranchStore } from '../store/useBranchStore';
import { DashboardChart } from '../components/dashboard/DashboardChart';
import { ProjectsOverview } from '../components/dashboard/ProjectsOverview';
import { RecruitmentStats } from '../components/dashboard/RecruitmentStats';
import { AddProjectModal } from '../components/projects/AddProjectModal';
import { ResidentDistribution } from '../components/dashboard/ResidentDistribution';
import { BillingStats } from '../components/dashboard/BillingStats';
import { MaintenanceOverview } from '../components/dashboard/MaintenanceOverview';
import { OccupancyTrends } from '../components/dashboard/OccupancyTrends';

export function Dashboard() {
  const { currentLanguage } = useLanguageStore();
  const { branches } = useBranchStore();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const ArrowIcon = currentLanguage === 'ar' ? ArrowLeft : ArrowRight;

  // Get unique regions from branches
  const uniqueRegions = [...new Set(branches.map(branch => branch.location))];

  const stats = [
    { 
      nameEn: 'Total Employees',
      nameAr: 'إجمالي الموظفين',
      value: '2,100',
      change: '+15%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      nameEn: 'Active Projects',
      nameAr: 'المشاريع النشطة',
      value: '24',
      change: '+3',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      nameEn: 'Monthly Revenue',
      nameAr: 'الإيرادات الشهرية',
      value: '3.2M',
      change: '+8%',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      nameEn: 'Open Positions',
      nameAr: 'الوظائف الشاغرة',
      value: '18',
      change: '+5',
      icon: UserPlus,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'نظرة عامة على أداء الشركة'
              : 'Company performance overview'
            }
          </p>
        </div>
        <button
          onClick={() => setShowProjectModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Briefcase className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'مشروع جديد' : 'New Project'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={currentLanguage === 'ar' ? stat.nameAr : stat.nameEn} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {currentLanguage === 'ar' ? stat.nameAr : stat.nameEn}
                    </dt>
                    <dd className="flex items-center mt-1">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <span className={`ml-2 text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <OccupancyTrends currentLanguage={currentLanguage} />
        </div>

        {/* Resident Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <ResidentDistribution currentLanguage={currentLanguage} />
        </div>

        {/* Billing Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <BillingStats currentLanguage={currentLanguage} />
        </div>

        {/* Maintenance Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <MaintenanceOverview currentLanguage={currentLanguage} />
        </div>
      </div>

      {/* Projects and Recruitment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <ProjectsOverview currentLanguage={currentLanguage} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <RecruitmentStats
            data={{
              applications: [150, 120, 160, 180, 140, 200],
              hires: [15, 12, 18, 20, 16, 22],
              months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            }}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>

      {/* Add Project Modal */}
      {showProjectModal && (
        <AddProjectModal onClose={() => setShowProjectModal(false)} />
      )}
    </div>
  );
}